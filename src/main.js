// Strict mode makes it easier to write "secure" JavaScript
'use Strict'

console.log('Iniciando ecomm');

// Import
const express = require('express');

// Constants
const PORT = process.env.PORT  // port passed in docker

//App
const app = express();
app.get('/', (req, res)=>{
    res.send('Ecomm: Em breve!!!');
    console.log(`'Running in port ${PORT}`);
});

app.listen(PORT);












