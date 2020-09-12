const express = require('express');
const { dirname } = require('path');
const app = express();
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/header', (req, res) => {
    res.sendFile(__dirname + '/header.html')
})



app.listen(3000, () => {
    console.log('Servidor corriendo..')
});

