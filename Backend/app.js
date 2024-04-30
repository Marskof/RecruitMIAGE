const express = require('express');
const mongoose = require('mongoose');
const Projets = require('./models/projets');

const app = express();

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});


mongoose.connect('mongodb+srv://marouane:marouane@recruitmiage.itau9ul.mongodb.net/?retryWrites=true&w=majority&appName=RecruitMiage',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.post('/api/projets', (req, res, next) => {
    delete req.body._id;
    const project = new Projets({
        ...req.body
    });
    project.save()
        .then(() => res.status(201).json({ message: 'Projet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    });

module.exports = app;