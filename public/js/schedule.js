// array con las horas de las clases, q usaremos tambien para imprimir el select del modo administrador
const CLASS_HOURS = ['16:00 - 16:55', '16:55 - 17:50', '17:50 - 18:45', '19:10 - 20:05', '20:05 - 21:00', '21:00 - 21:55'];
// array con los días de la semana, para utilizarlos como id de las celdas de la tabla y tambien lo exportamos
const DAY_LETTERS = ['L', 'M', 'X', 'J', 'V'];

function generateSchedule() {
    const SCHEDULE = document.querySelector('.guards-schedule tbody');

    CLASS_HOURS.forEach((classhour, index ) => {
        let row = SCHEDULE.insertRow();

        // creamos las celdas de la primera columna con las horas de la clases
        let cellHour = row.insertCell();
        cellHour.textContent = classhour;

        // creamos las celdas para cada día de la semana
        DAY_LETTERS.forEach(day => {
            let cell = row.insertCell();
            cell.id = `${day}-${index + 1}`;
        });
    });
}

//export { CLASS_HOURS, DAY_LETTERS };