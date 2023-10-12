import pandas as pd
from connectDb import requestDatas
import json
from datetime import datetime, timedelta

def is_outside_home(data):
    try:
        data_dict = json.loads(data)
        wifi_location = data_dict.get("wifi_location", {})
        gps = data_dict.get("gps", {})
        return not wifi_location and bool(gps)
    except json.JSONDecodeError:
        return False

def calculate_speed(data):
    try:
        data_dict = json.loads(data)
        gps = data_dict.get("gps", {})
        speed = gps.get("speed", None)
        return float(speed) if speed is not None else None
    except json.JSONDecodeError:
        return None

def format_duration(seconds):
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{int(hours)}h {int(minutes)}m {int(seconds)}s"

def walkAverage(all_data):
    df = pd.DataFrame(all_data)

    if 'time' not in df.columns:
        raise ValueError("La columna 'time' no existe en los datos proporcionados.")

    df['time'] = pd.to_datetime(df['time'], unit='ms')
    df.set_index('time', inplace=True)
    df['time_column'] = df.index
    df['outside_home'] = df['data'].apply(is_outside_home)
    df['time_next'] = df.groupby('dId')['time_column'].shift(-1)
    df['duration'] = df.apply(lambda x: (x['time_next'] - x['time_column']).total_seconds() if x['outside_home'] else 0, axis=1)

    # Filtrar registros solo para los eventos fuera de casa
    outside_home_events = df[df['outside_home']]
    
    # Calcular la velocidad promedio
    outside_home_events['speed'] = outside_home_events['data'].apply(calculate_speed)
    average_speed = outside_home_events.groupby(['device_name', 'dId'])['speed'].mean().reset_index(name='average_speed')

    # Agrupar por dispositivo y calcular el rango de horas en formato hh:mm:ss
    grouped_data = outside_home_events.groupby(['device_name', 'dId'])

    def calculate_time_range(group):
        start_time = group.index.min() - timedelta(hours=3)
        end_time = group.index.max() - timedelta(hours=3)
        return f"{start_time.strftime('%H:%M:%S')} - {end_time.strftime('%H:%M:%S')}"

    average_duration = grouped_data.apply(calculate_time_range).reset_index(name='time_range')

    # Calcular la duración promedio del tiempo que estuvo fuera de casa y formatearla
    average_outside_home_duration = outside_home_events.groupby(['device_name', 'dId'])['duration'].mean().reset_index(name='average_duration')
    average_outside_home_duration['average_duration'] = average_outside_home_duration['average_duration'].apply(format_duration)
    
    # Unir los resultados de velocidad promedio y rango de horas
    result = pd.merge(average_duration, average_speed, on=['device_name', 'dId'])
    
    # Unir los resultados de duración promedio
    result = pd.merge(result, average_outside_home_duration, on=['device_name', 'dId'])

    excel_file = 'excel_reports/walkAverageAll.xlsx'
    result.drop(columns=['time_range'], inplace=True)
    result.to_excel(excel_file, index=False)
    print(result)
    return result

all_data = requestDatas("6515cd2bf2295200154f579e")
walkAverage(all_data)
