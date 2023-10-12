from datetime import datetime

def fromUnixToDatetime(timestamp_ms):
    # Dividir el timestamp por 1000 para convertirlo de milisegundos a segundos
    timestamp_sec = timestamp_ms / 1000

    # Crear un objeto datetime a partir del timestamp en segundos
    dt = datetime.utcfromtimestamp(timestamp_sec)

    # Formatear la fecha en dd/mm/yyyy
    formatted_date = dt.strftime('%d/%m/%Y')
    # Formatear la hora en hh:mm:ss
    formatted_time = dt.strftime('%H:%M:%S')
    result = {"date": formatted_date, "time": formatted_time}
    return result
