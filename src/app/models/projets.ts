// Model pour les projets, ca sert à définir la structure des données des projets

export interface Project {
  _id: string;
  name: string;
  creator: string;
  creationDate: Date;
  description: string;
  contributors: string[];
  lastUpdate: Date;
  languages: string[];
  githubUrl: string;
  image: string;
  etoiles: number;
  nombrePlaces: number;
  difficulte: string;

}
