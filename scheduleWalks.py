import pandas as pd
from connectDb import requestDatas
import json
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
def scheduleWalks(all_data):
    filtered_data = [d for d in all_data if not json.loads(d['data']).get("wifi_location")]

    device_franjas = {}

# 3. Definir las franjas horarias (por ejemplo, de 1 hora)
# Puedes personalizar las franjas horarias según tus necesidades.
    time_window = 3600000  # 1 hora en milisegundos

    for record in filtered_data:
        device_name = record['device_name']
        time = record['time']
    
        start_time = int(time - (time % time_window))
        end_time = start_time + time_window
        start_time -= 3 * 3600000
        end_time -= 3 * 3600000
        franja = f"de {datetime.utcfromtimestamp(start_time / 1000).strftime('%H:%M')} a {datetime.utcfromtimestamp(end_time / 1000).strftime('%H:%M')}"

        if device_name in device_franjas:
            if franja in device_franjas[device_name]:
                device_franjas[device_name][franja] += 1
            else:
                device_franjas[device_name][franja] = 1
        else:
            device_franjas[device_name] = {franja: 1}

# 4. Encontrar la franja horaria con la mayor frecuencia para cada dispositivo
    device_max_franja = {}
    for device, franjas in device_franjas.items():
        max_franja = max(franjas, key=franjas.get)
        device_max_franja[device] = max_franja

# 5. Crear el DataFrame
    df = pd.DataFrame({'Franja Horaria': device_max_franja}).T

# 6. Imprimir el DataFrame
    print(df)
    df.to_excel("excel_reports/scheduleWalks.xlsx")
all_data = requestDatas("6515cd2bf2295200154f579e")
scheduleWalks(all_data)
