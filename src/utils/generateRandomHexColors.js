function generarColoresAleatorios(cantidad) {
    const coloresDisponibles = [
        "#ff8779", "#2a84e9", "#66ff66", "#ffcc00", "#9933cc", "#00cc99", "#ff6666", "#3399ff", "#99cc00", "#ff9900",
        "#f06767", "#2787a7", "#57d15f", "#f2d23a", "#b770d9", "#2dd4d3", "#f46969", "#49a7d0", "#72de6e", "#f7de69",
        "#ff7e77", "#00a5db", "#72db78", "#faeb49", "#d892e9", "#4bd8d8", "#fa8e8e", "#7db5d3", "#9fe296", "#facf8e",
        "#ff999a", "#00a6dc", "#71e273", "#fdfa5e", "#e6a1ec", "#60dada", "#fa9999", "#86bbe1", "#b7ecab", "#fabd99",
        "#fdacb2", "#88b4e4", "#8cc68c", "#feec56", "#f4c4f7", "#68e4e3", "#f48a8a", "#a1cae0", "#c5eaab", "#fdb899",
        "#ff9ea0", "#00abdd", "#a6ea75", "#fefc63", "#f0c0f9", "#7ce5e5", "#f4aaaa", "#a9cbe5", "#d0edbf", "#fdc6a3",
        "#ffa5a8", "#00b6f3", "#9fe584", "#ffea6a", "#f3cbfb", "#79ecec", "#f6b2b2", "#b7d6ec", "#b4f1b4", "#feb79a",
        "#ffb8ba", "#00b9f4", "#a3f6a2", "#fff96b", "#f5c8fd", "#7cecec", "#f79a9a", "#badcec", "#bff4bf", "#fea69b",
        "#ffc6c8", "#00baf5", "#a9f7a8", "#fff584", "#f8cdfd", "#7deded", "#f9aaaa", "#bedded", "#c4f5c4", "#ffa69c",
        "#ffccd0", "#00bdf6", "#a7f8a7", "#fef36b", "#f9c9fd", "#80eeee", "#fbaaaa", "#c0eeee", "#c8f6c8", "#ffaaa6",
        "#ffced1", "#00bff7", "#a5f9a5", "#fef36b", "#fbc9fe", "#83efef", "#fcaaaa", "#c2efef", "#cbf7cb", "#ffaaa2",
        "#ffd1d3", "#00c0f8", "#a3faa3", "#fff36c", "#fcd9fe", "#87f1f1", "#fdabab", "#c6f2f2", "#cef8ce", "#ffaaa0",
        "#ffdad4"
    ];

    const coloresAleatorios = [];
    const longitudColores = coloresDisponibles.length;
    const numerosAleatorios = new Set();

    while (numerosAleatorios.size < cantidad) {
        const numeroAleatorio = Math.floor(Math.random() * longitudColores);
        numerosAleatorios.add(numeroAleatorio);
    }

    for (const numero of numerosAleatorios) {
        coloresAleatorios.push(coloresDisponibles[numero]);
    }

    return coloresAleatorios;
}
module.exports = generarColoresAleatorios  