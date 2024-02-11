const EXPRESS = require('express');
const FS = require('fs');
const APP = EXPRESS();
const PORT = process.env.PORT || 8080;

const JSON_USERS_FILE = '/data/users.json';
const JSON_GUARDS_FILE = '/data/guards.json';
const PUBLIC_INDEX = '/public/index.html'

APP.use(EXPRESS.json());
APP.use(EXPRESS.static('public'));

APP.get('/', (req, res) => {
    res.sendFile(__dirname + PUBLIC_INDEX);
});

APP.post('/login', (req, res) => {
    const { username, password } = req.body;
    FS.readFile(__dirname + JSON_USERS_FILE, (err, data) => {
        if (err) {
            //console.error("Error");
            res.status(500).json({ success: false, message: "Error interno del servidor" });
            return;
        }
        const USERS = JSON.parse(data).users;
        const FOUND_USER = USERS.find(user => user.username === username && user.password === password);
        if (FOUND_USER) {
            //console.error("Usuario correcto");
            res.json({ success: true, user: FOUND_USER });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
    });
});

APP.listen(PORT, () => {
    console.log(`Servidor runeado en http://localhost:${PORT}`);
});