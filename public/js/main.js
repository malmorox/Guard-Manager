const loginButton = document.getElementById("login-button")
loginButton.addEventListener("click", function () {
    let username = document.getElementById("user-field").value;
    let password = document.getElementById("password-field").value;

    fetch("users.json")
        .then(response => response.json())
        .then(users => {
            let found = users.some(user => user.username === username && user.password === password);
            if (found) {
                document.querySelector(".login-popup").style.display = "none";
            } else {
                alert("Nombre de usuario o contraseña incorrectos");
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos de los usuarios:", error);
        });
});