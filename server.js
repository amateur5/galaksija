const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serviraj statičke datoteke iz 'public' foldera
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.io veza
io.on('connection', (socket) => {
    console.log('Novi korisnik je povezan');

    // Postavi nadimak ili broj korisnika
    let nickname = `Korisnik-${Math.floor(Math.random() * 1000)}`; // Nasumično dodeljen nadimak ili broj

    // Emituj poruku sa stilovima, nadimkom i vremenom
    socket.on('chatMessage', (msgData) => {
        const time = new Date().toLocaleTimeString(); // Dobij trenutni čas
        const messageToSend = {
            text: msgData.text,        // Tekst poruke
            bold: msgData.bold,        // Bold stil
            italic: msgData.italic,    // Italic stil
            color: msgData.color,      // Boja teksta
            nickname: nickname,        // Dodaj nadimak
            time: time                 // Dodaj vreme poruke
        };
        io.emit('chatMessage', messageToSend); // Emituj poruku sa svim podacima svim korisnicima
    });

    // Signaling za WebRTC
    socket.on('signal', (data) => {
        socket.broadcast.emit('signal', data);
    });

    socket.on('disconnect', () => {
        console.log('Korisnik je isključen');
    });
});

// Pokreni server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server je pokrenut na portu ${PORT}`);
});
