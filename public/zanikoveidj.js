<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Radio Chat</title>
    <style>
        .user-entry {
            margin: 5px 0;
            padding: 5px;
        }
        .user-icon {
            margin-right: 5px;
        }
        .radio-galaksija {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Radio Galaksija Chat</h1>
    
    <!-- Chat area -->
    <div id="chatContainer"></div>
    
    <!-- Login form for Radio Galaksija -->
    <div>
        <h3>Login za Radio Galaksija:</h3>
        <input type="text" id="username" placeholder="Korisničko ime" value="Radio Galaksija" disabled />
        <input type="password" id="password" placeholder="Lozinka" />
        <button onclick="loginAsRadioGalaksija()">Login</button>
    </div>
    
    <script>
        let usersList = [];
        let isLoggedInAsRadioGalaksija = false;

        // Funkcija za generisanje nasumičnih ID-ova za goste
        function generateGuestID() {
            return `Gost #${Math.floor(Math.random() * 10000)}`;
        }

        // Funkcija koja omogućava korisnicima da biraju boje/stilove
        function chooseColorOrStyle() {
            const colors = ["red", "green", "blue", "orange", "purple"];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        // Funkcija za login kao Radio Galaksija
        function loginAsRadioGalaksija() {
            const passwordInput = document.getElementById('password').value;
            if (passwordInput === 'marakana') {
                alert('Uspešno ste se ulogovali kao Radio Galaksija!');
                isLoggedInAsRadioGalaksija = true;
                addRadioGalaksijaToList();
                renderChat();
            } else {
                alert('Pogrešna lozinka!');
            }
        }

        // Dodaj "Radio Galaksija" u listu korisnika sa posebnom ikonicom
        function addRadioGalaksijaToList() {
            usersList.unshift({
                username: "Radio Galaksija",
                icon: "⭐",  // Specijalna ikonica
                color: chooseColorOrStyle(),  // Boje i stilove može birati slobodno
                isDJ: true  // Oznaka da je specijalan korisnik
            });
        }

        // Funkcija za dodavanje gosta u listu
        function addGuestToList() {
            const guestUser = {
                username: generateGuestID(),
                icon: "⚫",  // Ikonica za gosta
                color: chooseColorOrStyle()  // Gost bira boju
            };
            usersList.push(guestUser);
        }

        // Funkcija za prikaz korisnika u chat-u
        function renderUser(user) {
            let icon = user.isDJ ? "⭐" : user.icon;  // Specijalna ikonica za Radio Galaksija
            let displayName = user.username;

            return `
                <div class="user-entry" style="color: ${user.color}">
                    <span class="user-icon">${icon}</span> ${displayName}
                </div>
            `;
        }

        // Funkcija za prikaz celokupne liste korisnika u chat-u
        function renderChat() {
            const chatContainer = document.getElementById('chatContainer');
            chatContainer.innerHTML = '';  // Očisti trenutni prikaz
            usersList.forEach(user => {
                chatContainer.innerHTML += renderUser(user);
            });
        }

        // Inicijalizuj chat sa gostima (nasumični broj) i renderuj sve
        function initChat() {
            // Dodaj nekoliko gostiju (za testiranje)
            addGuestToList();
            addGuestToList();
            addGuestToList();
            
            // Renderuj sve korisnike u chat-u
            renderChat();
        }

        // Pokreni chat kada se stranica učita
        window.onload = function() {
            initChat();
        };
    </script>
</body>
</html>
