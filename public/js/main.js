document.addEventListener('DOMContentLoaded', function() {
    function assignGuard(guard) {

    }

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
});