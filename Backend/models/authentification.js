const mongoose = require('mongoose'); 

const authentificationSchema = new mongoose.Schema({ // Création du schéma de données, comme une table en SQL
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
    });
    

const Authentification = mongoose.model('Authentification', authentificationSchema); // Création du modèle de données, comme une classe en Java

module.exports = Authentification; // sert a utiliser ce modele dans d'autres fichiers