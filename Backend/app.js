const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const projetsController = require('./controllers/projetsController');
const authentificationController = require('./controllers/authentificationController');


const app = express();

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


// Routes pour les projets
app.post('/api/projets', projetsController.createProjet);
app.get('/api/projets', projetsController.getAllProjets);
app.get('/api/projets/:id', projetsController.getProjetById);
app.put('/api/projets/:id', projetsController.updateProjet);
app.delete('/api/projets/:id', projetsController.deleteProjet);

// Routes pour l'authentification
app.post('/api/authentification', authentificationController.createUser);
app.get('/api/authentification', authentificationController.getAllUsers);
app.get('/api/authentification/:id', authentificationController.getUserById);
app.put('/api/authentification/:id', authentificationController.updateUser);
app.delete('/api/authentification/:id', authentificationController.deleteUser);



module.exports = app;