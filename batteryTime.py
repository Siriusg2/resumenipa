from connectDb import requestDatas
import pandas as pd
from utils.fromUnixToDatetime import fromUnixToDatetime
import json
from utils.diffTimeSeconds import diffTimeSeconds

# def format_duration(minutes):
#     print(minutes)
#     hours, remainder = divmod(minutes, 60)
#     # return f"{int(hours):02d}:{int(remainder):02d}:00"
#     return hours
# def battery_time(all_data, dId=None ):
#    # Crear un DataFrame de Pandas a partir de tus datos
#     df = pd.DataFrame(all_data)

# # Convertir la columna 'time' a datetime
#     df['time'] = pd.to_datetime(df['time'], unit='ms')

# # Calcular la duración de la batería en segundos
#     df['battery_duration'] = df.groupby('device_name')['time'].diff().dt.total_seconds()
# # Calcular el promedio de la duración de la batería por dispositivo (dId)
#     promedio_por_dispositivo = df.groupby('device_name')['battery_duration'].mean()
#     promedio_por_dispositivo = promedio_por_dispositivo.apply(format_duration)
#     promedio_por_dispositivo.to_excel("excel_reports/promedio_bateria.xlsx", index=True)
    # print(promedio_por_dispositivo)
    # response = {

    # }
    # for dispositivo, promedio in promedio_por_dispositivo.items():
    #     horas = int(promedio / 60)
    #     minutos = int(promedio % 60)
    #     segundos = int((promedio % 1) * 60)
    #     response[dispositivo] = {
    #         "horas": horas,
    #         "minutos": minutos,
    #         "segundos": segundos
    #     }
    
    # return response
# Imprimir el resultado

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
  
    data_structure = list(data_structure.values())
    result = {}
    index = 0
    total_day = 0
    total = 0
    while len(data_structure)> index:
        index_per_device = 0
        index_per_day = 0
        for day, data_day in data_structure[index]["data"].items():
            index_per_device+=1
            for i, (time, battery) in enumerate(data_day.items()):
                index_per_day+=1
                total_day+=battery
            total_day = total_day / index_per_day
            total+=total_day
        total = total / index_per_device
        result[data_structure[index]["name"]] = {
       "total_avg":int(fromUnixToDatetime(total)),
       "day_avg":int(fromUnixToDatetime(total_day))
            }

        index += 1
    print(result)


  
print(battery_time(requestDatas("6515cd2bf2295200154f579e")))

