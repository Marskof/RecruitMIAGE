const mongoose = require('mongoose');
const Project = require('../models/projets');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://marouane:marouane@recruitmiage.itau9ul.mongodb.net/RecruitMiage?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données RecruitMiage réussie !'))
  .catch(() => console.log('Connexion à la base de données RecruitMiage échouée !'));

// Données à insérer dans la base de données
const projectsData = [
  { 
    name: 'Projet 1', 
    creator: 'Créateur 1', 
    creationDate: new Date('2022-01-01'), 
    description: 'Description du projet 1', 
    contributors: ['Membre 1', 'Membre 2', 'Membre 3'], 
    lastUpdate: new Date('2022-04-05'), 
    languages: ['Java', 'HTML', 'CSS'], 
    githubUrl: 'https://github.com/projet1',
    image: '../images/imgJS.jpg',
    etoiles: 212 
  },
  { 
    name: 'Projet 2', 
    creator: 'Créateur 2', 
    creationDate: new Date('2022-02-02'), 
    description: 'Description du projet 2', 
    contributors: ['Membre 4', 'Membre 5'], 
    lastUpdate: new Date('2022-04-07'), 
    languages: ['JavaScript', 'TypeScript'], 
    githubUrl: 'https://github.com/projet2',
    image: '../images/imgJava.jpg',
    etoiles: 213
  },
  { 
    name: 'Projet 3', 
    creator: 'Créateur 3', 
    creationDate: new Date('2022-03-03'), 
    description: 'Description du projet 3', 
    contributors: ['Membre 6', 'Membre 7', 'Membre 8'], 
    lastUpdate: new Date('2022-04-08'), 
    languages: ['Python'], 
    githubUrl: 'https://github.com/projet3',
    image: '../images/imgPython.png',
    etoiles: 216 
  }
  // Ajoutez autant d'objets de projet que vous le souhaitez
];

// Fonction pour insérer les données dans la base de données
const populateDatabase = async () => {
  try {
    // Supprimer tous les projets existants pour éviter les doublons
    await Project.deleteMany({});
    
    // Insérer les nouveaux projets
    const insertedProjects = await Project.insertMany(projectsData);
    console.log(`${insertedProjects.length} projets insérés avec succès dans la base de données.`);
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
  } finally {
    // Déconnexion de la base de données
    mongoose.disconnect();
  }
};

// Appel de la fonction pour peupler la base de données
populateDatabase();
