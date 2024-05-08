const Authentification = require('../models/authentification');
const Project = require('../models/projets'); 


// Créer un utilisateur
// Créer un utilisateur
exports.createUser = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Aucune donnée envoyée dans le corps de la requête' });
    }

    const { nom, prenom, username, email, password, cgu } = req.body;

    if (!nom || !prenom || !username || !email || !password || !cgu) {
        return res.status(400).json({ error: 'Toutes les données requises ne sont pas fournies' });
    }

    // Vérifier si l'username est déjà utilisé
    Authentification.findOne({ username })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({ error: 'Cet utilisateur existe déjà' });
            }

            // Si l'username est unique, créer le nouvel utilisateur
            const user = new Authentification({
                nom,
                prenom,
                username,
                email,
                password,
                cgu
            });

            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur enregistré !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
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

// Verifier si un utilisateur appartient à un projet en regardant si le nom d'utilisateur est dans la liste des contributeurs ou bien si l'utilisateur est le créateur du projet

exports.checkAppartientProjet = (req, res, next) => {
    const userId = req.params.userId; 
    const projectId = req.params.projetId;

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

                    const userIsCreator = project.creator === username;
                    const userIsContributor = project.contributors.includes(username);

                    if (!userIsCreator && !userIsContributor) {
                        return res.status(404).json({ message: "L'utilisateur ne fait pas partie du projet" });
                    }

                    res.status(200).json({ userIsContributor });
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


// Vérifier si un utilisateur existe
exports.checkUserExist = (req, res, next) => {
    const { username, email } = req.body;

    if (!username && !email) {
        return res.status(400).json({ error: 'Nom utilisateur ou email non fourni' });
    }

    const criteres = username ? { username } : { email }; // ternaire qui permet de vérifier si username existe, si oui on le met dans criteres, sinon on met email

    Authentification.findOne(criteres) // findOne() est une méthode de mongoose
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ message: 'Utilisateur trouvé', user });
        })
        .catch(error => res.status(500).json({ error }));
};



// Vérifier si un utilisateur existe et vérifier les informations de connexion
exports.checkInfosUser = (req, res, next) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({ error: 'Nom utilisateur ou email et mot de passe non fournis' });
    }

    // Vérifier si l'entrée est une adresse e-mail
    const isEmail = usernameOrEmail.includes('@');

    let criteres = {};

    if (isEmail) {
        criteres = { email: usernameOrEmail };
    } else {
        criteres = { username: usernameOrEmail };
    }

    Authentification.findOne(criteres)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            // Vérification du mot de passe
            if (user.password !== password) {
                return res.status(401).json({ message: 'Mot de passe incorrect' });
            }

            res.status(200).json({ message: 'Connexion réussie', user });
        })
        .catch(error => res.status(500).json({ error }));
};

