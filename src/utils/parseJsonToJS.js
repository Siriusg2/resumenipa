function parsearObjeto(objeto) {
    for (const clave in objeto) {
        if (objeto.hasOwnProperty(clave)) {
            const valor = objeto[clave];
            if (typeof valor === "string") {
                try {
                    const objetoAnalizado = JSON.parse(valor);
                    objeto[clave] = objetoAnalizado;
                } catch (error) {
                    // Si no se puede analizar como JSON, no hacemos nada.
                }
            } else if (typeof valor === "object") {
                parsearObjeto(valor); // Llamada recursiva para objetos anidados
            }
        }
    }
}

// Ejemplo de uso:
let objeto = { "chartData": { "labels": ["PowerOn", "PowerOn", "PowerOn", "PowerOn", "geofenceOut", "geofenceOut", "PowerOn", "PowerOn", "geofenceOut", "PowerOn"], "datasets": [{ "label": "Maddy", "fill": true, "backgroundColor": "#ff9900", "hoverBackgroundColor": "#ff9900", "borderColor": "#ff9900", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [4, 2, 1, 1] }, { "label": "Mora", "fill": true, "backgroundColor": "#ff8779", "hoverBackgroundColor": "#ff8779", "borderColor": "#ff8779", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [2, 1, 1] }, { "label": "Chimu", "fill": true, "backgroundColor": "#66ff66", "hoverBackgroundColor": "#66ff66", "borderColor": "#66ff66", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [4, 2, 3] }, { "label": "Tiana", "fill": true, "backgroundColor": "#ff6666", "hoverBackgroundColor": "#ff6666", "borderColor": "#ff6666", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [9, 4] }, { "label": "Sambayon", "fill": true, "backgroundColor": "#ff6666", "hoverBackgroundColor": "#ff6666", "borderColor": "#ff6666", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [3, 2, 4] }, { "label": "Sari", "fill": true, "backgroundColor": "#ffcc00", "hoverBackgroundColor": "#ffcc00", "borderColor": "#ffcc00", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [54, 1] }, { "label": "Lara", "fill": true, "backgroundColor": "#ff9900", "hoverBackgroundColor": "#ff9900", "borderColor": "#ff9900", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [6, 33, 1] }, { "label": "Rene", "fill": true, "backgroundColor": "#ffcc00", "hoverBackgroundColor": "#ffcc00", "borderColor": "#ffcc00", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [4] }, { "label": "Neutron", "fill": true, "backgroundColor": "#ff6666", "hoverBackgroundColor": "#ff6666", "borderColor": "#ff6666", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [48, 4, 4] }, { "label": "Amigo", "fill": true, "backgroundColor": "#99cc00", "hoverBackgroundColor": "#99cc00", "borderColor": "#99cc00", "borderWidth": 2, "borderDash": [], "borderDashOffset": 0, "data": [3, 5] }] } }

parsearObjeto(objeto);

console.log(objeto);
