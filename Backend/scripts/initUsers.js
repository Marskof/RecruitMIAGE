// fichier pour initialiser la base de données users 

const mongoose = require('mongoose');
const Authentification = require('../models/authentification');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://marouane:marouane@recruitmiage.itau9ul.mongodb.net/RecruitMiage?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données RecruitMiage réussie !'))
  .catch(() => console.log('Connexion à la base de données RecruitMiage échouée !'));
// Données à insérer dans la base de données
const usersData = [
    { nom: 'Manar', prenom: 'Marouane', username: 'Marouane', email: 'marouane.manar@miage.com', password: 'toto' },
    { nom: 'Renauld', prenom: 'Théo', username: 'Théo', email: 'theo.renauld@miage.com', password: 'titi' },
    { nom: 'Soutric', prenom: 'Anais', username: 'Anais', email: 'anais.soutric@miage.com', password: 'tata' }
];

// Fonction pour insérer les données dans la base de données
const populateDatabase = async () => {
    try {
    // Supprimer tous les utilisateurs existants pour éviter les doublons
    await Authentification.deleteMany({});
    
    // Insérer les nouveaux utilisateurs
    const insertedUsers = await Authentification.insertMany(usersData);
    console.log(`${insertedUsers.length} utilisateurs insérés avec succès dans la base de données.`);
    } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
    } finally {
    // Déconnexion de la base de données
    mongoose.disconnect();
    }
};

// Appel de la fonction pour peupler la base de données
populateDatabase();
