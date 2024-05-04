const Authentification = require('../models/authentification');
const Project = require('../models/projets'); 


// Créer un utilisateur
exports.createUser = (req, res, next) => {
    // Vérifie si req.body est défini et contient les données attendues
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Aucune donnée envoyée dans le corps de la requête' });
    }

    const { nom, prenom, username, email, password, cgu } = req.body;

    // Vérifie si toutes les données requises sont présentes
    if (!nom || !prenom || !username || !email || !password || !cgu) {
        return res.status(400).json({ error: 'Toutes les données requises ne sont pas fournies' });
    }

    // Crée un nouvel utilisateur avec les données fournies
    const user = new Authentification({
        nom,
        prenom,
        username,
        email,
        password,
        cgu
    });

    // Sauvegarde l'utilisateur dans la base de données
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};


// Lire tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    Authentification.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};
    
// Lire un utilisateur par ID
exports.getUserById = (req, res, next) => {
    Authentification.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json(user);
        })
        .catch(error => res.status(400).json({ error }));
};

// Mettre à jour un utilisateur par ID
exports.updateUser = (req, res, next) => {
    Authentification.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur mis à jour' }))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un utilisateur par ID
exports.deleteUser = (req, res, next) => {
    Authentification.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
        .catch(error => res.status(400).json({ error }));
};

// Verifier si un utilisateur appartient à un projet
exports.checkAppartientProjet = (req, res, next) => {
    const userId = req.params.userId; 
    const projectId = req.params.projetId;

    // findById() est une méthode de mongoose
    Authentification.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            const username = user.username;

            Project.findById(projectId)
                .then(project => {
                    if (!project) {
                        return res.status(404).json({ message: 'Projet non trouvé' });
                    }

                    const userIsContributor = project.contributors.includes(username);

                    if (!userIsContributor) {
                        return res.status(404).json({ message: 'L\'utilisateur ne fait pas partie du projet' });
                    }

                    res.status(200).json({ userIsContributor: true });
                })
                .catch(error => {
                    if (error.name === 'CastError') {
                        return res.status(400).json({ message: 'ID de projet invalide' });
                    }
                    res.status(500).json({ error });
                });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};