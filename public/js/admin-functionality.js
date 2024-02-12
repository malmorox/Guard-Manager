const MANAGE_GUARDS_FORM = document.getElementById('manage-guards');
MANAGE_GUARDS_FORM.addEventListener('submit', function(e) {
    e.preventDefault();

    const GUARD_TEACHER = document.getElementById('guard-teacher').value;
    const GUARD_DAY = document.getElementById('guard-day').value;
    const GUARD_HOUR = document.getElementById('guard-hour').value;
    const GUARD_PLACE = document.getElementById('guard-place').value;

    assignGuard({ teacher: GUARD_TEACHER, day: GUARD_DAY, hour: GUARD_HOUR, place: GUARD_PLACE });
});

function assignGuard(guard) {
    const XHR = new XMLHttpRequest();
    XHR.open('POST', '/guards', true);
    XHR.setRequestHeader('Content-Type', 'application/json');

    XHR.onload = function() {
        if (XHR.status >= 200 && XHR.status < 300) {
            // la guardia se asignó correctamente
            //const NEW_GUARD = JSON.parse(XHR.responseText).guard;
            // actualizamos la tabla con las guardias
            loadGuards();
            clearAdminForm();
            showSuccessMessage('Guardia asignada correctamente');
        } else {
            //console.error('Error al asignar la guardia');
            showErrorMessage('Error al asignar la guardia');
        }
    };

    XHR.onerror = function() {
        console.error('Error de red al intentar asignar la guardia.');
    };

    XHR.send(JSON.stringify(guard));
}

function showSuccessMessage(message) {
    alert(message);
}

function showErrorMessage(message) {
    alert(message);
}

function clearAdminForm() {
    // limpiamos los campos del formulario de admin
    document.getElementById('guard-teacher').value = '';
    document.getElementById('guard-day').value = '';
    document.getElementById('guard-hour').value = '';
    document.getElementById('guard-place').value = '';
}


/*function editGuard(guard) {

}

function deleteGuard(celdaId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta guardia?')) {
        const XHR = new XMLHttpRequest();
        XHR.open("DELETE", `/guards/${celdaId}`, true);

        XHR.onload = function() {
            if (XHR.status >= 200 && xhr.status < 300) {
                console.log("Guardia eliminada con éxito");
                const celda = document.getElementById(celdaId);
                if (celda) {
                    celda.innerHTML = ''; // Limpiar el contenido de la celda
                    delete asignacionesGuardias[celdaId]; // Eliminar del registro de asignaciones
                }
            } else {
                console.error("Error al eliminar la guardia:", xhr.statusText);
            }
        };

        xhr.onerror = function() {
            console.error("Error en la petición XHR");
        };

        xhr.send();
    }
}*/

function loadGuards() {
    const XHR = new XMLHttpRequest();
    XHR.open('GET', '/guards');
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.onload = function() {
        if (XHR.status === 200) {
            const data = JSON.parse(XHR.responseText);
            data.guards.forEach(guard => {
                updateGuards(guard);
            });
        } else {
            console.error('Error al cargar las guardias');
        }
    };
    XHR.onerror = function() {
        console.error('Error de red mientras cargaban las guardias');
    };
    XHR.send();
}

function updateGuards(guard) {
    const cellId = `${guard.day}-${guard.hour}`;
    const cell = document.getElementById(cellId);

    // creamos un contenedor para mostrar la info de la guardia
    const guardContainer = document.createElement('div');
    guardContainer.classList.add('guard-container');

    const guardInfo =  document.createElement('div');
    guardInfo.innerHTML = `<b>${guard.teacher}</b>: ${guard.place}`;
    const guardButtons =  document.createElement('div');

    const guardEditButton = document.createElement('button');
    guardEditButton.className = 'guard-edit-button';
    guardEditButton.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>';
    //guardEditButton.onclick = function() { editGuard(task.id, taskEditButton); };

    const guardDeleteButton = document.createElement('button');
    guardDeleteButton.className = 'guard-delete-button';
    guardDeleteButton.innerHTML = '<i class="fa-solid fa-trash" style="color: #ffffff;"></i>';
    //guardDeleteButton.onclick = function() { deleteGuard(task.id); };

    guardContainer.appendChild(guardInfo);
    guardButtons.appendChild(guardEditButton);
    guardButtons.appendChild(guardDeleteButton);
    guardContainer.appendChild(guardButtons);

    cell.appendChild(guardContainer);
}