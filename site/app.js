const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/header', (req, res) => {
    res.sendFile(__dirname + '/header.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

app.get('/payForm', (req, res) => {
    res.sendFile(__dirname + '/payForm.html')
})

app.get('/registerForm', (req, res) => {
    res.sendFile(__dirname + '/registerForm.html')
})

app.get('/productDetail', (req, res) => {
    res.sendFile(__dirname + '/productDetail.html')
})

app.get('/productCart', (req, res) => {
    res.sendFile(__dirname + '/productCart.html')
})

app.get('/ingreso', (req, res) => {
    res.sendFile(__dirname + '/ingreso.html')
})

app.listen(3000, () => {
    console.log('Servidor corriendo..')
});


