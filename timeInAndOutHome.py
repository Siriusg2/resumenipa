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
        return  horas

    horas_dentro_casa = milisegundos_a_dias_horas_minutos_segundos(
        tiempo_dentro_casa)
    horas_fuera_casa = milisegundos_a_dias_horas_minutos_segundos(
        tiempo_fuera_casa)
    response = {
        "en_casa": {
       
            "horas": int(horas_dentro_casa)
          
        },
        "fuera_de_casa": {

          
            "horas": int(horas_fuera_casa),
      
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



import pandas as pd
import json
from datetime import datetime, timedelta

def is_inside_home(data):
    try:
        data_dict = json.loads(data)
        wifi_location = data_dict.get("wifi_location", {})
        if len(wifi_location)>0:
            return False
        else:
            return True 
    except json.JSONDecodeError:
        return False

def is_outside_home(data):
    try:
        data_dict = json.loads(data)
        gps = data_dict.get("gps", {})
        if len(gps)>0:
            return False
        else:
            return True 
    except json.JSONDecodeError:
        return False

def format_timedelta(seconds):
    # duration = timedelta(seconds=seconds)
    # days = duration.days
    # seconds = duration.seconds
    # hours, seconds = divmod(seconds, 3600)
    # minutes, seconds = divmod(seconds, 60)
    # return f"{days} días {hours} horas {minutes} minutos {seconds} segundos"
    return seconds//3600


def timeInAndOutHome(all_data):
    # Tu array de objetos
    data_array =all_data
    # Crear un DataFrame desde el array de objetos
    df = pd.DataFrame(data_array)

    # Parsear la columna 'time' a datetime
    df['time'] = pd.to_datetime(df['time'], unit='ms')

    # Ordenar el DataFrame por 'device_name', 'dId' y 'time'
    df.sort_values(by=['device_name', 'dId', 'time'], inplace=True)

    # Calcular la diferencia de tiempo entre registros consecutivos
    df['time_diff'] = df.groupby(['device_name', 'dId'])['time'].diff()

    # Calcular el tiempo acumulado dentro y fuera de casa
    df['inside_home'] = df['data'].apply(is_inside_home)
    df['outside_home'] = df['data'].apply(is_outside_home)
    df['time_inside'] = df['inside_home'] * df['time_diff'].apply(lambda x: x.total_seconds())
    df['time_outside'] = df['outside_home'] * df['time_diff'].apply(lambda x: x.total_seconds())

    # Agrupar por 'device_name' y 'dId' y sumar el tiempo acumulado
    result_df = df.groupby(['device_name', 'dId'])[['time_inside', 'time_outside']].sum().reset_index()

    # Formatear el tiempo acumulado a timedelta
    result_df['time_inside'] = result_df['time_inside'].apply(format_timedelta)
    result_df['time_outside'] = result_df['time_outside'].apply(format_timedelta)
    return result_df
    # Exportar el DataFrame resultante a un archivo de Excel
    # excel_file = 'excel_reports/time_in_and_out_home.xlsx'
    # result_df.to_excel(excel_file, index=False)

all_data = requestDatas("6515cd2bf2295200154f579e")
print(timeInAndOutHome(all_data))

