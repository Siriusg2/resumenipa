function obtenerHoraDesdeTimestamp(timestamp) {
    const fecha = new Date(timestamp / 1000);
    const hora = fecha.getHours();
    return hora;
}

console.log(obtenerHoraDesdeTimestamp(1699231716000));