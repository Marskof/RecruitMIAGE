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
  }
  