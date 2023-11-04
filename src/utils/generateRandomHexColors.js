function generarColoresAleatorios(cantidad) {
    const coloresAleatorios = [];

    for (let i = 0; i < cantidad; i++) {
        const hue = Math.floor(Math.random() * 360); // Valor de matiz (0-359)
        const saturation = Math.floor(Math.random() * 50) + 50; // Saturación (50-100%)
        const lightness = Math.floor(Math.random() * 40) + 30; // Luminosidad (30-70%)

        const color = `hsl(${hue},${saturation}%,${lightness}%)`;
        coloresAleatorios.push(color);
    }

    return coloresAleatorios;
}



module.exports = generarColoresAleatorios