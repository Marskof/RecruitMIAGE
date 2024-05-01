const express = require('express');
const mongoose = require('mongoose');
const Projets = require('./models/projets');
const path = require('path');

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
app.post('/api/projets', (req, res, next) => {
    delete req.body._id;
    const project = new Projets({
        ...req.body
    });
    project.save()
        .then(() => res.status(201).json({ message: 'Projet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    });

// Lire tous les projets
app.get('/api/projets', (req, res, next) => {
  Projets.find()
      .then(projets => res.status(200).json(projets))
      .catch(error => res.status(400).json({ error }));
});

// Lire un projet par ID
app.get('/api/projets/:id', (req, res, next) => {
  Projets.findById(req.params.id)
      .then(projet => {
          if (!projet) {
              return res.status(404).json({ message: 'Projet non trouvé' });
          }
          res.status(200).json(projet);
      })
      .catch(error => res.status(400).json({ error }));
});

// Mettre à jour un projet par ID
app.put('/api/projets/:id', (req, res, next) => {
  Projets.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Projet mis à jour' }))
      .catch(error => res.status(400).json({ error }));
});

// Supprimer un projet par ID
app.delete('/api/projets/:id', (req, res, next) => {
  Projets.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Projet supprimé' }))
      .catch(error => res.status(400).json({ error }));
});

module.exports = app;