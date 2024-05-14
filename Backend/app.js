// code 200: OK
// code 201: Created
// code 400: Bad Request
// code 404: Not Found
// code 500: Internal Server Error

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const projetsController = require('./controllers/projetsController');
const authentificationController = require('./controllers/authentificationController');
const bodyParser = require('body-parser'); // Permet de parser les requetes HTTP

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


mongoose.connect('mongodb+srv://marouane:marouane@recruitmiage.itau9ul.mongodb.net/RecruitMiage?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données RecruitMiage réussie !'))
  .catch(() => console.log('Connexion à la base de données RecruitMiage échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// ********** Routes pour les projets **********

// Crée un nouveau projet
app.post('/api/projets', projetsController.createProjet);

// Récupère tous les projets
app.get('/api/projets', projetsController.getAllProjets);

// Récupère un projet par son id
app.get('/api/projets/:id', projetsController.getProjetById);

// Met à jour un projet par son id
app.put('/api/projets/:id', projetsController.updateProjet);

// Supprime un projet par son id
app.delete('/api/projets/:id', projetsController.deleteProjet);

// Met à jour le nombre d'étoiles d'un projet
app.patch('/api/projets/:id/like', projetsController.updateProjetStars);



// ********** Routes pour l'authentification **********

// Crée un nouvel utilisateur
app.post('/api/authentification', authentificationController.createUser);

// Récupère tous les utilisateurs
app.get('/api/authentification', authentificationController.getAllUsers);

// Récupère un utilisateur par son identifiant
app.get('/api/authentification/:id', authentificationController.getUserById);

// Met à jour un utilisateur existant
app.put('/api/authentification/:id', authentificationController.updateUser);

// Supprime un utilisateur existant
app.delete('/api/authentification/:id', authentificationController.deleteUser);

// Vérifie si un utilisateur appartient à un projet
app.get('/api/authentification/:userId/projets/:projetId/check', authentificationController.checkAppartientProjet);

// Vérifie si un utilisateur existe
app.post('/api/authentification/checkUser', authentificationController.checkUserExist);

// Vérifie les informations d'un utilisateur
app.post('/api/authentification/checkInfosUser', authentificationController.checkInfosUser);




module.exports = app;