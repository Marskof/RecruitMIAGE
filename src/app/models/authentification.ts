// Model pour les utilisateurs, ca sert à définir la structure des données des utilisateurs

export interface utilisateur {
    _id: string; 
    nom: string;
    prenom: string;
    username: string;
    email: string;
    password: string;
    cgu: boolean;
}
