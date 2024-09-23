export function formatearFecha(fecha) {
    const dateObj = new Date(fecha); // Convertir a objeto Date
    const dia = String(dateObj.getUTCDate()).padStart(2, '0');
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const año = dateObj.getUTCFullYear();
    return `${dia}/${mes}/${año}`;
}

// Función para formatear la hora
export function formatearHora(hora) {
    const horaObj = new Date(hora); // Convertir la cadena a objeto Date
    const horas = String(horaObj.getUTCHours()).padStart(2, '0');
    const minutos = String(horaObj.getUTCMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}
