const popupOpenButton = document.getElementById('popup-open-button');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup-container');
const popupCloseButton = document.getElementById('popup-close-button');
const taskAddButton = document.getElementById('task-add-button');

/* Evento de click para abrir el pop-up de agregar tarea */
popupOpenButton.addEventListener('click', function(){
    popupContainer.classList.add('active');
    popup.classList.add('active');
});

/* Evento de click para cerrar el pop-up */
popupCloseButton.addEventListener('click', function(e){
    e.preventDefault();
    popupContainer.classList.remove('active');
    popup.classList.remove('active');
});
