const LOGIN_FORM = document.getElementById('login-form');
LOGIN_FORM.addEventListener('submit', function (e) {
    e.preventDefault();
    let username = document.getElementById('username-field').value;
    let password = document.getElementById('password-field').value;

    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/login", true);
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    XHR.onload = function() {
        if (XHR.status === 200) {
            const data = JSON.parse(XHR.responseText);
            if (data.success) {
                document.querySelector('.login-popup').style.visibility = "hidden";
                if (data.user.type === 'admin') {
                    document.querySelector('.guards-admin-panel').style.display = "flex";
                }
            } else {
                handleIncorrectCredentials();
            }
        } else {
            handleError(XHR.status);
        }
    };
    const data = JSON.stringify({ username: username, password: password });
    XHR.send(data);
});

function handleIncorrectCredentials() {
    document.getElementById('password-field').value = '';
    alert("Nombre de usuario o contraseña incorrectos");
}

function handleError(status) {
    if (status === 401) {
        handleIncorrectCredentials();
    } else {
        //alert("Error al realizar la solicitud");
        console.error("Error al realizar la solicitud");
    }
}