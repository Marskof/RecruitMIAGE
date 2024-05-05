const mongoose = require('mongoose');

const authentificationSchema = new mongoose.Schema({ // Création du schéma de données, comme une table en SQL
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
    });
    

const Authentification = mongoose.model('Authentification', authentificationSchema);

module.exports = Authentification;