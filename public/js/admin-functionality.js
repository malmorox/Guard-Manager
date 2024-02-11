document.addEventListener('DOMContentLoaded', function() {

    const ADD_GUARD_BUTTON = document.getElementById('guard-add-button')
    ADD_GUARD_BUTTON.addEventListener("click", function () {

        const manageGuardsForm = document.getElementById('manage-guards');

        const GUARD_TEACHER = document.getElementById('guard-teacher');
        const GUARD_DAY = document.getElementById('guard-day');
        const GUARD_HOUR = document.getElementById('guard-hour');
        const GUARD_PLACE = document.getElementById('guard-place');

        assignGuard();
    });

    function assignGuard(guard) {

    }
});

