from connectDb import requestDatas
import pandas as pd
from utils.fromUnixToDatetime import fromUnixToDatetime
import json
from utils.diffTimeSeconds import diffTimeSeconds

def calcular_rendimiento_bateria(device_data):
    rendimiento = {}
    prev_time = None
    prev_battery = None

    for date, data in device_data.items():
        time = data['unixinseconds']
        battery = next(iter(data.values()))

        if prev_time is not None:
            diferencia_tiempo = time - prev_time
            diferencia_bateria = prev_battery - battery
            if diferencia_bateria > 0 and diferencia_tiempo//3600 <24:
                rendimiento[date] = abs(round(((diferencia_bateria / diferencia_tiempo) * 3600)*24, 1))  # Convertir a unidades por hora
              # Convertir a unidades por hora

        prev_time = time
        prev_battery = battery

    return rendimiento


def battery_time(all_data, dId=None):
    # We create the data structure to dataframe
    sorted_data = sorted(all_data, key=lambda x: x["time"])

    data_structure = {}

    for entry in  sorted_data:
        if len(entry["data"]):
            data = json.loads(entry["data"])
            time = fromUnixToDatetime(entry["time"]).get("time")
            date=fromUnixToDatetime(entry["time"]).get("date")
            name = entry["device_name"]
         
            if "battery" in data["status"]:
                battery_level = data["status"]["battery"]
                id=entry["dId"]
                if id not in data_structure:
                    data_structure[id] = {
                    "name": name,
                    "data":{}
                }
                else:
                    if date not in data_structure[id]["data"]:
                        data_structure[id]["data"][date] = {}
                        if time not in data_structure[id]["data"][date]:
                            data_structure[id]["data"][date][time] = battery_level
                            data_structure[id]["data"][date]["unixinseconds"] = int(entry["time"])//1000
    result = {}
    for device_id, device_info in data_structure.items():
        device_name = device_info['name']
        device_data = device_info['data']
        rendimiento_bateria = calcular_rendimiento_bateria(device_data)
        if device_name not in result:
            result[device_name] = {
            "gasto_bateria_dia": rendimiento_bateria
            }
        else:
            result[device_name]["rendimiento_bateria_dia"] = rendimiento_bateria

    promedio_por_dispositivo = {}

    for dispositivo, datos in result.items():
        promedio = round(100/round(sum(datos["gasto_bateria_dia"].values()) / len(datos["gasto_bateria_dia"]),1),1)
        promedio_por_dispositivo[dispositivo] = promedio  
    
    #convertir resultado final en dataframe
    df = pd.DataFrame(list(promedio_por_dispositivo.items()), columns=['Nombre', 'Dias'])
    df.set_index('Nombre', inplace=True)
    df.to_excel('excel_reports/promedio_bateria.xlsx')
    return promedio_por_dispositivo


  
data_structure = battery_time(requestDatas("6515cd2bf2295200154f579e"))



