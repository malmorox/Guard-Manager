const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});