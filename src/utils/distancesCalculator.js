const distancesCalculator = (lat1, lon1, lat2, lon2) => {
    const radioTierraKms = 6371; // Radio de la Tierra en kilómetros
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanciaKms = radioTierraKms * c;
    return distanciaKms;
}

function toRadians(grados) {
    return grados * (Math.PI / 180);
}




module.exports = distancesCalculator

