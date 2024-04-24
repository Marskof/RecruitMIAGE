import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  getProjects() {
    return [
      { id: 1, name: 'Projet 1', creator: 'Créateur 1', creationDate: '01/01/2022', contributorsCount: 5, difficulty: 'Moyenne', language: 'Java' },
      { id: 2, name: 'Projet 2', creator: 'Créateur 2', creationDate: '02/02/2022', contributorsCount: 3, difficulty: 'Élevée', language: 'JavaScript' },
      { id: 3, name: 'Projet 3', creator: 'Créateur 3', creationDate: '03/03/2022', contributorsCount: 7, difficulty: 'Faible', language: 'Python' }
    ];
  }

  constructor() { }

  getProjectById(id:number) {
    console.log(id);
    return this.getProjects().find(project => project.id === id);
  }

}
