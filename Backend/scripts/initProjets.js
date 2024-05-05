//Fichier qui sert a initialiser la base de données avec des projets

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
    creationDate: '2022-01-01',
    description: 'Description du projet 1',
    contributors: ['Membre 1', 'Membre 2', 'Membre 3'],
    lastUpdate: '2022-04-05',
    languages: ['Java', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/projet1',
    image: '../images/imgJS.jpg',
    nombrePlaces :5,
    difficulte : 'L1',
    etoiles: 212
  },
  {
    name: 'Projet 2',
    creator: 'Créateur 2',
    creationDate: '2022-01-01',
    description: 'Description du projet 2',
    contributors: ['Membre 4', 'Membre 5'],
    lastUpdate: '2022-04-05',
    languages: ['JavaScript', 'TypeScript'],
    githubUrl: 'https://github.com/projet2',
    image: '../images/imgJava.jpg',
    nombrePlaces :5,
    difficulte : 'L1',
    etoiles: 213
  },
  {
    name: 'Projet 3',
    creator: 'Créateur 3',
    creationDate: '2022-01-01',
    description: 'Description du projet 3',
    contributors: ['Membre 6', 'Membre 7', 'Membre 8'],
    lastUpdate: '2022-04-05',
    languages: ['Python'],
    githubUrl: 'https://github.com/projet3',
    image: '../images/imgPython.png',
    nombrePlaces :5,
    difficulte : 'L1',
    etoiles: 216
  }
];

// Fonction pour insérer les données dans la base de données
const populateDatabase = async () => {
  try {
    await Project.deleteMany({}); // Supprime tous les projets qui existe deja

    const insertedProjects = await Project.insertMany(projectsData);
    console.log(`${insertedProjects.length} projets insérés avec succès dans la base de données.`);
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
  } finally {
    mongoose.disconnect();
  }
};

// Appel de la fonction 
populateDatabase();
