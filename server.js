const EXPRESS = require('express');
const FS = require('fs');
const PATH = require('path');
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

APP.get('/users', (req, res) => {
    FS.readFile(__dirname + JSON_USERS_FILE, (err, data) => {
        if (err) {
            res.status(500).json({ success: false, message: "Error interno del servidor" });
            return;
        }
        const USERS = JSON.parse(data).users;
        const TEACHERS = USERS.filter(user => user.type === 'teacher');
        res.json({ success: true, users: TEACHERS });
    });
});

async function readGuards() {
    try {
        const data = await FS.promises.readFile(__dirname + JSON_GUARDS_FILE, "utf8");
        return JSON.parse(data).guards;
    } catch (error) {
        console.error("Error leyendo el archivo de guardias:", error);
        throw error;
    }
}

async function writeGuards(data) {
    try {
        const filePath = PATH.join(__dirname, JSON_GUARDS_FILE);
        await FS.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
        console.error("Error escribiendo en el archivo de guardias:", error);
        throw error;
    }
}

APP.post("/guards", async (req, res) => {
    const { teacher, day, hour, place } = req.body;
    try {
        const GUARDS = await readGuards();
        const NEW_GUARD = { teacher, day, hour, place };

        GUARDS.push(NEW_GUARD);
        await writeGuards({ guards: GUARDS });

        res.json({ message: "Guardia creada con éxito", guard: NEW_GUARD });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la guardia" });
    }
});

APP.get("/guards", async (req, res) => {
    try {
        const data = await readGuards();
        res.json(data);
    } catch (error) {
        console.error("Error al obtener las guardias:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

APP.listen(PORT, () => {
    console.log(`Servidor runeado en http://localhost:${PORT}`);
});