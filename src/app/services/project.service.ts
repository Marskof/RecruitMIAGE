import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects = [
    { 
      id: 1, 
      name: 'Projet 1', 
      creator: 'Créateur 1', 
      creationDate: '01/01/2022', 
      description: 'Description du projet 1', 
      contributors: ['Membre 1', 'Membre 2', 'Membre 3'], 
      lastUpdate: '05/04/2022', 
      languages: ['Java', 'HTML', 'CSS'], 
      githubUrl: 'https://github.com/projet1',
      image: 'assets/images/imgJS.jpg',
      etoiles: 212 
    },
    { 
      id: 2, 
      name: 'Projet 2', 
      creator: 'Créateur 2', 
      creationDate: '02/02/2022',  
      description: 'Description du projet 2', 
      contributors: ['Membre 4', 'Membre 5'], 
      lastUpdate: '07/04/2022', 
      languages: ['JavaScript', 'TypeScript'], 
      githubUrl: 'https://github.com/projet2',
      image: 'assets/images/imgPython.png',
      etoiles: 213
    },
    { 
      id: 3, 
      name: 'Projet 3', 
      creator: 'Créateur 3', 
      creationDate: '03/03/2022', 
      description: 'Description du projet 3', 
      contributors: ['Membre 6', 'Membre 7', 'Membre 8'], 
      lastUpdate: '08/04/2022', 
      languages: ['Python'], 
      githubUrl: 'https://github.com/projet3',
      image: 'assets/images/imgJava.jpg',
      etoiles: 216 
    },
  ];

  constructor() { }

  // Récupère un projet par son ID
  getProjectById(id: number) {
    return this.projects.find(project => project.id === id);
  }

  // Récupère les projets auxquels l'utilisateur a contribué
  getContributedProjects(userContributors: string[]) {
    return this.projects.filter(project => project.contributors.some(contributor => userContributors.includes(contributor)));
  }

  // Récupère les projets créés par un createur
  getProjectsCreatedByUser(creator: string) {
    return this.projects.filter(project => project.creator === creator);
  }

  // Récupère tous les projets
  getProjects() {
    return this.projects;
  }
}
