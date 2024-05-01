import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/projets';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:3000/api/projets'; // Remplacez cette URL par l'URL de votre API REST côté serveur

  constructor(private http: HttpClient) { }

  // Récupérer tous les projets
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Récupérer un projet par son ID
  getProjectById(id: string): Observable<Project> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Project>(url);
  }

  // Ajouter un nouveau projet
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  // Mettre à jour un projet existant
  updateProject(project: Project): Observable<Project> {
    const url = `${this.apiUrl}/${project._id}`;
    return this.http.put<Project>(url, project);
  }

  // Supprimer un projet par son ID
  deleteProject(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
