from connectDb import requestDatas
import pandas as pd



def battery_time(all_data, dId=None ):
   # Crear un DataFrame de Pandas a partir de tus datos
    df = pd.DataFrame(all_data)

# Convertir la columna 'time' a datetime
    df['time'] = pd.to_datetime(df['time'], unit='ms')

# Calcular la duración de la batería en segundos
    df['battery_duration'] = df.groupby('dId')['time'].diff().dt.total_seconds()

# Calcular el promedio de la duración de la batería por dispositivo (dId)
    promedio_por_dispositivo = df.groupby('dId')['battery_duration'].mean()
    # print(promedio_por_dispositivo)
    for dispositivo, promedio in promedio_por_dispositivo.items():
        horas = int(promedio / 60)
        minutos = int(promedio % 60)
        segundos = int((promedio % 1) * 60)
        print(dispositivo, f"horas:{horas}, minutos:{minutos}, segundos:{segundos}")
# Imprimir el resultado

print(battery_time(requestDatas("6515cd2bf2295200154f579e")))

