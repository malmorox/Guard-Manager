document.addEventListener('DOMContentLoaded', function() {
    const LOGIN_BUTTON = document.getElementById('login-button')
    LOGIN_BUTTON.addEventListener('click', function () {
        let username = document.getElementById('username-field').value;
        let password = document.getElementById('password-field').value;

        fetch("/users")
            .then(response => response.json())
            .then(users => {
                let foundUser = users.find(user => user.username === username && user.password === password);
                if (foundUser) {
                    document.querySelector(".login-popup").style.visibility = "hidden";
                    if (foundUser.type === 'admin') {
                        document.querySelector(".guards-admin-panel").style.visibility = "flex";
                    }
                } else {
                    password = '';
                    alert("Nombre de usuario o contraseña incorrectos");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos de los usuarios:", error);
            });
    });
});