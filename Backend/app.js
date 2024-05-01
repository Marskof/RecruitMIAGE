const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const projetsController = require('./controllers/projetsController');

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


// Créer un projet
app.post('/api/projets', projetsController.createProjet);

// Lire tous les projets
app.get('/api/projets', projetsController.getAllProjets);

// Lire un projet par ID
app.get('/api/projets/:id', projetsController.getProjetById);

// Mettre à jour un projet par ID
app.put('/api/projets/:id', projetsController.updateProjet);

// Supprimer un projet par ID
app.delete('/api/projets/:id', projetsController.deleteProjet);



module.exports = app;