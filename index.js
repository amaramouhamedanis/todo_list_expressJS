import express from 'express';
import { engine } from 'express-handlebars';


const app = express();
const port = 3000;

// Configurer Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware pour traiter les données des formulaires
app.use(express.urlencoded({ extended: true }));

// Liste des tâches
let listTaches = [
    { id: 1, title: 'anis' },
    { id: 2, title: 'anis2' },
    { id: 3, title: 'anis3' }
];

// Route pour afficher la liste des tâches
app.get('/', (req, res) => {
    res.render('index', { taches: listTaches });
});

// Route pour afficher le formulaire d'ajout de tâche
app.get('/ajouter', (req, res) => {
    res.render('ajouter');
});

// Route pour ajouter une tâche
app.post('/ajouter', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.render('ajouter', { error: "Le titre est requis" });
    }

    listTaches.push({ id: listTaches.length + 1, title });
    res.redirect('/');
});

// Route pour afficher le formulaire de modification
app.get('/modifier/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tache = listTaches.find(t => t.id === id);

    if (!tache) {
        return res.redirect('/');
    }

    res.render('modifier', { tache });
});

// Route pour mettre à jour une tâche
app.post('/modifier/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;

    const tache = listTaches.find(t => t.id === id);
    if (tache) {
        tache.title = title;
    }

    res.redirect('/');
});

// Route pour supprimer une tâche
app.post('/supprimer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    listTaches = listTaches.filter(t => t.id !== id);
    
    res.redirect('/');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


app.get('/', (req, res) => {
    res.render('index', { isActiveTaches: true });
});

app.get('/ajouter', (req, res) => {
    res.render('ajouter', { isActiveAjouter: true });
});

app.get('/modifier', (req, res) => {
    res.render('modifier', { isActiveModifier: true });
});

app.get('/supprimer', (req, res) => {
    res.render('supprimer', { isActiveSupprimer: true });
}
);

// Import MongoDB connection
//require('./config/db'); // This ensures the database is connected

// Middleware & Routes
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//app.listen(port, () => {
  //  console.log(` Server running on port ${port}`);
//});




// websocket 


import { WebSocketServer, WebSocket } from 'ws';

const server = new WebSocketServer({ port: 8081 });
const clients = new Set();

server.on('connection', (socket) => {
    console.log('Client connected');
    clients.add(socket); // Add new client to the set

    // Handle messages from clients
    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
        clients.delete(socket); // Remove client from the set
    });

    // Handle socket errors (FIXED: Now inside the connection handler)
    socket.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
    });
});

console.log('WebSocket server is running on ws://localhost:8081');

