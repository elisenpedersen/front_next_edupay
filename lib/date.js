

export function formatearFecha(fecha) {
    console.log(fecha);
    const dateObj = new Date(fecha); // Convertir a objeto Date
    console.log(dateObj);
    const dia = String(dateObj.getUTCDate()).padStart(2, '0');
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const año = dateObj.getUTCFullYear();
    console.log(`${dia}/${mes}/${año}`);

    return `${dia}/${mes}/${año}`;
}

// Función para formatear la hora
export function formatearHora(hora) {
    const horaObj = new Date(hora); // Convertir la cadena a objeto Date
    const horas = String(horaObj.getUTCHours()).padStart(2, '0');
    const minutos = String(horaObj.getUTCMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}
