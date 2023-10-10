import math

# Función para calcular la distancia entre dos puntos geográficos
def calculate_distance(lat1, lon1, lat2, lon2):
    # Radio de la Tierra en kilómetros (aproximado)
    radio_tierra = 6371.0

    # Convertir las coordenadas de grados a radianes
    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    # Diferencias en latitud y longitud
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Fórmula de Haversine
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

    # Distancia en kilómetros
    distancia = radio_tierra * c

    return distancia