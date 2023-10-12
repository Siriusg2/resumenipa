def diffTimeSeconds(timestamp_inicio, timestamp_final):
    diferencia_segundos = timestamp_final - timestamp_inicio

# Convierte la diferencia de tiempo a un formato más legible (por ejemplo, días, horas, minutos, segundos)
    dias = diferencia_segundos // 86400
    horas = (diferencia_segundos % 86400) // 3600
    minutos = (diferencia_segundos % 3600) // 60
    segundos = diferencia_segundos % 60
    return segundos