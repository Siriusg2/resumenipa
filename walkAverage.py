import pandas as pd
from connectDb import requestDatas
import json

# Supongamos que tienes una lista de objetos que representan tus registros
# Cada objeto tiene propiedades: 'time' (timestamp en milisegundos), 'dId' (identificador del dispositivo), 'device_name'
# Por ejemplo:
# def walkAverage(all_data):


# # Crear un DataFrame de pandas a partir de los datos
#     df = pd.DataFrame(all_data)

# # Convertir el campo 'time' a un objeto datetime
#     df['time'] = pd.to_datetime(df['time'], unit='ms')

# # Establecer 'time' como índice
#     df.set_index('time', inplace=True)

# # Agrupar por 'dId' y por día y contar los registros en cada grupo
#     result = df.groupby([df.index.date, 'dId', 'device_name']).size().reset_index(name='count')
    
#     print(result)
def is_outside_home(data):
  
    try:
        data_dict = json.loads(data)
        wifi_location = data_dict.get("wifi_location", {})
        gps = data_dict.get("gps", {})
        return not wifi_location and not gps
    except json.JSONDecodeError:
        return False

def walkAverage(all_data):
    df = pd.DataFrame(all_data)
    # print (df.at[0, 'time'])
    # Verificar si la columna 'time' existe en 'all_data'
    if 'time' not in df.columns:
        raise ValueError("La columna 'time' no existe en los datos proporcionados.")

    # Crear un DataFrame de pandas a partir de los datos


    # Convertir el campo 'time' a un objeto datetime
    df['time'] = pd.to_datetime(df['time'], unit='ms')

    # Establecer 'time' como índice
    df.set_index('time', inplace=True)
    df['time_column'] = df.index
    # Aplicar la función para determinar si el dispositivo está fuera de casa a cada registro
    df['outside_home'] = df['data'].apply(is_outside_home)
    
    # Crear una columna 'time_next' que contiene el tiempo del siguiente registro por dispositivo
    # print(df)
    df['time_next'] = df.groupby('dId')['time_column'].shift(-1)
    print(df.iloc[0])

    # # # Calcular la duración de cada evento fuera de casa
    # df['duration'] = df.apply(lambda x: (x['time_next'] - x['time_column']).total_seconds() if x['outside_home'] else 0, axis=1)
    # filtered_df = df[df['outside_home'] == True]
    # print(filtered_df)
    
    # # Filtrar registros solo para los eventos fuera de casa
    # outside_home_events = df[df['outside_home']]

    # # Agrupar por día y dispositivo y calcular el promedio de duración fuera de casa
    # average_duration = outside_home_events.groupby(['time', 'dId', 'device_name'])['duration'].mean().reset_index()

    # return average_duration
all_data = requestDatas("6515cd2bf2295200154f579e")
print(walkAverage(all_data))