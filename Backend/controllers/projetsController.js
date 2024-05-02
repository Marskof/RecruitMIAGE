const Projets = require('../models/projets');

// Créer un projet
exports.createProjet = (req, res, next) => {
    delete req.body._id;
    const project = new Projets({
        ...req.body
    });
    project.save()
        .then(() => res.status(201).json({ message: 'Projet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

// Lire tous les projets
exports.getAllProjets = (req, res, next) => {
    Projets.find()
        .then(projets => res.status(200).json(projets))
        .catch(error => res.status(400).json({ error }));
};

// Lire un projet par ID
exports.getProjetById = (req, res, next) => {
    Projets.findById(req.params.id)
        .then(projet => {
            if (!projet) {
                return res.status(404).json({ message: 'Projet non trouvé' });
            }
            res.status(200).json(projet);
        })
        .catch(error => res.status(400).json({ error }));
};

// Mettre à jour un projet par ID
exports.updateProjet = (req, res, next) => {
    Projets.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Projet mis à jour' }))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer un projet par ID
exports.deleteProjet = (req, res, next) => {
    Projets.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Projet supprimé' }))
        .catch(error => res.status(400).json({ error }));
};

// Mettre à jour le nombre de etoiles d'un projet par son id
exports.updateProjetStars = (req, res, next) => {
    Projets.findById(req.params.id)
        .then(projet => {
            if (!projet) {
                return res.status(404).json({ message: 'Projet non trouvé' });
            }
            projet.etoiles++;
            return projet.save();
        })
        .then(() => res.status(200).json({ message: 'Nombre etoiles du projet mis à jour' }))
        .catch(error => res.status(400).json({ error }));
};