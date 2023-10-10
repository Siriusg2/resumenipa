from connectDb import requestDatas
import json
import datetime
import time


def timeInAndOutHome(all_data, dId=None):
    if dId != None:
        allEntries = [item for item in all_data if item["dId"] == dId]
    else:
        allEntries = all_data

    sorted_allEntries = sorted(allEntries, key=lambda x: x["time"])

    tiempo_dentro_casa = 0
    tiempo_fuera_casa = 0

# Paso 3: Recorre la lista de objetos y calcula el tiempo acumulado.
    for i in range(len(sorted_allEntries) - 1):
        objeto_actual = sorted_allEntries[i]
        data = json.loads(objeto_actual["data"])

        objeto_siguiente = sorted_allEntries[i + 1]

        tiempo_diferencia = objeto_siguiente["time"] - objeto_actual["time"]

        if len(data["wifi_location"]):
            tiempo_dentro_casa += tiempo_diferencia
        else:
            tiempo_fuera_casa += tiempo_diferencia

# Paso 4: Convierte los tiempos acumulados a días, horas, minutos y segundos.
    def milisegundos_a_dias_horas_minutos_segundos(milisegundos):
        segundos, milisegundos = divmod(milisegundos, 1000)
        minutos, segundos = divmod(segundos, 60)
        horas, minutos = divmod(minutos, 60)
        dias, horas = divmod(horas, 24)
        return dias, horas, minutos, segundos

    dias_dentro_casa, horas_dentro_casa, minutos_dentro_casa, segundos_dentro_casa = milisegundos_a_dias_horas_minutos_segundos(
        tiempo_dentro_casa)
    dias_fuera_casa, horas_fuera_casa, minutos_fuera_casa, segundos_fuera_casa = milisegundos_a_dias_horas_minutos_segundos(
        tiempo_fuera_casa)
    response = {
        "en_casa": {
            "dias": int(dias_dentro_casa),
            "horas": int(horas_dentro_casa),
            "minutos": int(minutos_dentro_casa),
            "segundos": int(segundos_dentro_casa)
        },
        "fuera_de_casa": {

            "dias": int(dias_fuera_casa),
            "horas": int(horas_fuera_casa),
            "minutos": int(minutos_fuera_casa),
            "segundos": int(segundos_fuera_casa)

        }
    }
    return response


all_data = requestDatas("6515cd2bf2295200154f579e")
response = {}
device_names_dict = {data["dId"]: data["device_name"] for data in all_data}
for key, value in device_names_dict.items():
    response[key] = timeInAndOutHome(all_data, key)
    response[key]["name"] = value


print(response)
