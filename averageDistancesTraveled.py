import json
from connectDb import requestDatas
from datetime import datetime
from utils.calculate_distance import calculate_distance
import pandas as pd

def averageDistancesTraveled(all_data, dId=None):
    data_trackers = list(all_data)
    dict_distances_per_tracker = {}

    """ 
        Modelo en dict_distances_per_tracker
        
    {
        "*862095056154922" : { 
            "24-09-23": {
                'data': [{tracker_data}, {...}],
                'total_distance_kms': 0, # Total del dia
                'prev_tracker': {} 
            },
        },
    }
    
    """

    for tracker in data_trackers:
        if "data" in tracker:
            data = json.loads(tracker["data"])

            if "gps" in data and data["gps"] != "":
                tracker_id = tracker["device_name"]
                timestamp_unix = data["gps"]["time"]
                timestamp = datetime.fromtimestamp(timestamp_unix / 1000)
                distance_datetime = str(timestamp.date())

                if tracker_id in dict_distances_per_tracker:
                    # dict_distances_per_tracker[tracker_id] Es el objeto que contiene todas las fechas y sus datas
                    if distance_datetime in dict_distances_per_tracker[tracker_id]:
                        # Hacer el calculo de la posicion anterior y el actual (distancia en kms) y guardarlo en total_distance
                        prev_lat = float(
                            dict_distances_per_tracker[tracker_id][distance_datetime][
                                "prev_tracker"
                            ]["lat"]
                        )
                        prev_lng = float(
                            dict_distances_per_tracker[tracker_id][distance_datetime][
                                "prev_tracker"
                            ]["lng"]
                        )
                        lat = float(tracker["lat"])
                        lng = float(tracker["lng"])

                        dict_distances_per_tracker[tracker_id][distance_datetime][
                            "data"
                        ].append(tracker)
                        dict_distances_per_tracker[tracker_id][distance_datetime][
                            "total_distance_kms"
                        ] += calculate_distance(prev_lat, prev_lng, lat, lng)
                    else:
                        dict_distances_per_tracker[tracker_id][distance_datetime] = {
                            "data": [tracker],
                            "total_distance_kms": 0,
                        }

                    dict_distances_per_tracker[tracker_id][distance_datetime][
                        "prev_tracker"
                    ] = tracker
                else:
                    # dict_distances_per_tracker[tracker_id] Es el objeto que contiene todas las fechas y sus datas
                    dict_distances_per_tracker[tracker_id] = {}
                    dict_distances_per_tracker[tracker_id][distance_datetime] = {
                        "data": [tracker],
                        "total_distance_kms": 0,
                        "prev_tracker": tracker,
                    }

    """ Testing """
    # print('Largo de todas las datas',len(data_trackers))
    # print('Largo y Propiedades de dict_distances_per_tracker', len(dict_distances_per_tracker), dict_distances_per_tracker.keys())

    # print('keys',dict_distances_per_tracker['*862095056154922'].keys())
    # print('Largo de un rastreador en una fecha especifica', dict_distances_per_tracker['*862095056372110']['2023-09-28']['total_distance_kms'])
    """ ------- """

    # Obtener recorrido total de los rastreadores y obtener el promedio
    total_distance_traveled_kms = 0
    total_distance_per_tracker = {}

    for tracker_gps in dict_distances_per_tracker:
        tracker_obj = dict_distances_per_tracker[tracker_gps]
        total_distance_per_tracker[tracker_gps] = {"total": 0, "count": 0}

        for datetime_distance_obj in tracker_obj:
            total_distance_traveled_kms += tracker_obj[datetime_distance_obj][
                "total_distance_kms"
            ]
            total_distance_per_tracker[tracker_gps]["total"] += tracker_obj[
                datetime_distance_obj
            ]["total_distance_kms"]
            total_distance_per_tracker[tracker_gps]["count"] += 1

        total_distance_per_tracker[tracker_gps]["total"] = round(
            total_distance_per_tracker[tracker_gps]["total"], 2
        )

    # print(total_distance_traveled_kms)
    # print(
    #     "promedio", total_distance_traveled_kms / len(dict_distances_per_tracker.keys())
    # )
    # print("total de recorrido por rastreador", total_distance_per_tracker)
    return total_distance_per_tracker
    # return {
    #     "total_distance_traveled_kms": total_distance_traveled_kms,
    #     "average_distance_traveled_kms": total_distance_traveled_kms
    #     / len(dict_distances_per_tracker.keys()),
    #     "total_distance_per_tracker": total_distance_per_tracker,
    # }


all_data = requestDatas("6515cd2bf2295200154f579e")
# print(averageDistancesTraveled(all_data))

def convert_data_to_excel(data):
    df = pd.DataFrame(data).T

# Calcular la columna 'average'
    df['average'] = df['total'] / df['count']

    # Exportar el DataFrame a un archivo Excel
    df.to_excel("excel_reports/averageDistancesTraveled.xlsx")
convert_data_to_excel(averageDistancesTraveled(all_data))