// Pretpostavljamo da je socket.io već povezan
const socket = io();

// 1. Stanja za stilove: bold, italic, color
let isBold = false;
let isItalic = false;
let currentColor = '#FFFFFF'; // Početna boja: bela

// 2. Funkcija za BOLD formatiranje
document.getElementById('boldBtn').addEventListener('click', function() {
    isBold = !isBold; // Promeni stanje za bold
    updateInputStyle(); // Primeni na polje za unos
});

// 3. Funkcija za ITALIC formatiranje
document.getElementById('italicBtn').addEventListener('click', function() {
    isItalic = !isItalic; // Promeni stanje za italic
    updateInputStyle(); // Primeni na polje za unos
});

// 4. Funkcija za biranje boje koristeći paletu
document.getElementById('colorBtn').addEventListener('click', function() {
    // Klikom na dugme za boju otvara se paleta boja
    document.getElementById('colorPicker').click();
});

// 5. Kada korisnik izabere boju iz palete
document.getElementById('colorPicker').addEventListener('input', function() {
    currentColor = this.value; // Ažuriraj trenutnu boju sa izabranom
    updateInputStyle(); // Primeni boju na polje za unos
});

// 6. Funkcija za primenu stilova u polju za unos poruka
function updateInputStyle() {
    let inputField = document.getElementById('chatInput');
    inputField.style.fontWeight = isBold ? 'bold' : 'normal';
    inputField.style.fontStyle = isItalic ? 'italic' : 'normal';
    inputField.style.color = currentColor; // Uvek primeni trenutnu boju
}

// 7. Kada korisnik pritisne Enter da pošalje poruku
document.getElementById('chatInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Spreči novi red
        let message = this.value;

        // Emituj poruku sa stilovima i vremenom preko socket.io
        socket.emit('chatMessage', {
            text: message,
            bold: isBold,
            italic: isItalic,
            color: currentColor
        });

        this.value = ''; // Isprazni polje za unos
    }
});

// 8. Kada server pošalje poruku svim korisnicima
socket.on('chatMessage', function(data) {
    let messageArea = document.getElementById('messageArea');
    let newMessage = document.createElement('div');
    newMessage.classList.add('message');

    // Primeni stilove na poruku na osnovu podataka iz socket-a
    newMessage.style.fontWeight = data.bold ? 'bold' : 'normal';
    newMessage.style.fontStyle = data.italic ? 'italic' : 'normal';
    newMessage.style.color = data.color; // Primeni boju

    // Formatiraj prikaz poruke sa nadimkom, porukom i vremenom
    newMessage.innerHTML = `<strong>${data.nickname}:</strong> ${data.text} <span style="font-size: 0.8em; color: gray;">(${data.time})</span>`;

    messageArea.appendChild(newMessage); // Dodaj novu poruku u messageArea

    // Automatsko skrolovanje na dno kada stigne nova poruka
    messageArea.scrollTop = messageArea.scrollHeight;
});
