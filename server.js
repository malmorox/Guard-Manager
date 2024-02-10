const EXPRESS = require('express');
const FS = require('fs');
const APP = EXPRESS();
const PORT = process.env.PORT || 8080;

APP.use(EXPRESS.json());
APP.use(EXPRESS.static('public'));


APP.listen(PORT, () => {
    console.log(`Servidor runeado en http://localhost:${PORT}`);
});