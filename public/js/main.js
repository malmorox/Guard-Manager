//import { CLASS_HOURS, DAY_LETTERS } from './schedule.js';

document.addEventListener('DOMContentLoaded', function() {
    // SELECT DE LOS PROFESORES PARA EL MODO ADMINISTRADOR
    fetch('/users')
        .then(response => response.json())
        .then(data => {
        const SELECT_TEACHERS = document.getElementById('guard-teacher');

        const TEACHERS = data.users.filter(user => user.type === 'teacher');

        TEACHERS.forEach(teacher => {
            const OPTION = document.createElement('option');
            OPTION.value = teacher.name;
            OPTION.textContent = teacher.name;
            SELECT_TEACHERS.appendChild(OPTION);
        });
    });

    // SELECT DE DÍAS DE LA SEMANA PARA EL MODO ADMINISTRADOR
    const SELECT_DAYS = document.getElementById('guard-day');
    const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    // iteramos sobre el array de los días y creamos un elemento option en cada una para rellenar el select
    DAYS_OF_WEEK.forEach((day, index) => {
        const OPTION = document.createElement('option');
        OPTION.value = DAY_LETTERS[index];
        OPTION.textContent = day;
        SELECT_DAYS.appendChild(OPTION);
    });

    // SELECT DE HORAS DE CLASE PARA EL MODO ADMINISTRADOR
    const SELECT_HOURS = document.getElementById('guard-hour');

    // iteramos sobre el array de las horas y creamos un elemento option en cada una para rellenar el select
    CLASS_HOURS.forEach(hour => {
        const OPTION = document.createElement('option');
        OPTION.value = hour;
        OPTION.textContent = hour;
        SELECT_HOURS.appendChild(OPTION);
    });

    generateSchedule();
    loadGuards();
});

function assignGuard(guard) {

}