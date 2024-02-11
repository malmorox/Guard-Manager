function generateSchedule() {
    const SCHEDULE = document.querySelector('.guards-schedule tbody');
    const CLASS_HOURS = ['16:00 - 16:55', '16:55 - 17:50', '17:50 - 18:45', '19:10 - 20:05', '20:05 - 21:00', '21:00 - 21:55'];
    const DAY_LETTERS = ['L', 'M', 'X', 'J', 'V'];

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

document.addEventListener('DOMContentLoaded', function() {
    generateSchedule();
});