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

APP.get('/users', (req, res) => {
    FS.readFile(__dirname + JSON_USERS_FILE, (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

APP.listen(PORT, () => {
    console.log(`Servidor runeado en http://localhost:${PORT}`);
});