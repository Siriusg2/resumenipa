from shapely.geometry import Point
from connectDb import requestDatas
import pymongo
import json
from dotenv import load_dotenv
import os


def get_geofences_from_db(dId):
    load_dotenv()
    host = str(os.getenv("DB_HOST"))
    port = int(os.getenv("DB_PORT"))
    username = str(os.getenv("DB_USERNAME"))
    password = str(os.getenv("DB_PASSWORD"))
    database_name = str(os.getenv("DB_NAME"))
    client = pymongo.MongoClient(
        host, port, username=username, password=password)
    db = client[database_name]
    collection = db["devices"]

    device = collection.find({"dId": dId})[0]
    data = json.loads(device["data"])

    if device["data"] == "":
        return []
    if "config" not in data or data["config"] == "":
        return []
    if "geofences" not in data["config"]:
        return []
    return data["config"]["geofences"]


def crear_geocerca(coordenadas_geocerca=None, diametro_metros=100):
    if isinstance(coordenadas_geocerca, list) and len(coordenadas_geocerca) == 2:
        # Si se proporciona una sola coordenada (latitud, longitud), crea una geocerca circular
        center_latitude, center_longitude = coordenadas_geocerca
        radio_distance = diametro_metros / 2.0

        # Crear un punto para el centro del círculo
        center_point = Point(center_latitude, center_longitude)
        # Crear una circunferencia (geocerca circular) alrededor del centro
        circunference = center_point.buffer(
            radio_distance / 100000)  # Buffer en metros
        return circunference
    else:
        raise ValueError(
            "Se debe proporcionar una sola tupla de latitud y longitud para crear la geocerca."
        )


def verify_geofence_in_out(geofence_object, coordenates_device):

    # Crea un punto para representar las coordenadas del dispositivo
    device_point = Point(coordenates_device)

    # Comprueba si el punto está dentro de la geocerca
    inside = geofence_object.contains(device_point)

    if inside:
        return True
    elif not inside:
        return False


def verify_geofences_general(device_data, current_coords):

    # '*862095056194456': {'dId': '*862095056194456', 'exits_count': 0, 'last_geofence': '', 'geofences': [{'activated': 1, 'name': 'Home', 'coords': [-31.399601, -64.191109], 'diameter': 100, 'id': 1}]}
    geofences_array = device_data["geofences"]
    # Corrobora tener geocercas configuradas en la base de datos
    if len(geofences_array) == 0:
        return

    # Crea el "objeto geocerca" que corresponde a cada geocerca de la terminal que está guardada en la bdd
    for geofence in geofences_array:
        geofence_obj = crear_geocerca(
            geofence["coords"], geofence["diameter"]
        )

        # Corrobora si el dispositivo entró en una geocerca (está dentro de una geocerca y antes no estaba dentro de ninguna o estaba dentro de otra)
        if (
            verify_geofence_in_out(
                geofence_obj, current_coords) == True and
                device_data["last_geofence"] != geofence["name"]

        ):
            device_data["last_geofence"] = geofence["name"]

        # # Corrobora si el dispositivo salió de una geocerca (está fuera de la geocerca y antes estaba dentro)
        elif (
                device_data["last_geofence"] == geofence["name"]
            and verify_geofence_in_out(geofence_obj, current_coords)
            == False
        ):
            device_data["last_geofence"] = ""
            device_data["exits_count"] = device_data["exits_count"]+1
            # Si no se cumplen ninguno de los casos anteriores, no se agrega la propiedad "geofence_status" a la respuesta
            # Por ende, la base de datos conservará su "geofence_status" anterior cuando se actualize


def count_exits(all_entrances):

    full_response = {}
    for entrance in all_entrances:
        data = entrance["data"]
        if data == "":
            continue

        if entrance["dId"] not in full_response:
            full_response[entrance["dId"]] = {
                "dId": entrance["dId"],
                "name": entrance["device_name"],
                "exits_count": 0,
                "last_geofence": "",
                "geofences": get_geofences_from_db(entrance["dId"])
            }

        verify_geofences_general(full_response[entrance["dId"]], [
                                 entrance["lat"], entrance["lng"]])

    min_response = {
        "exits_count": 0,
        "detail": []
    }
    for response in full_response:
        min_response["detail"].append(
            {"dId": response, "name": full_response[response]["name"], "exits_count": full_response[response]["exits_count"]})
        min_response["exits_count"] = min_response["exits_count"] + \
            full_response[response]["exits_count"]

    return min_response if len(min_response["detail"]) > 1 else min_response["detail"][0]


all_data = requestDatas("6515cd2bf2295200154f579e")

print(count_exits(all_data))
