import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/projets';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:3000/api/projets';
  private languages: any;

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
  addProject(project: {
    nombrePlaces: number;
    languages: [String] | undefined;
    name: string;
    description: string;
    githubUrl:string;
    etoiles: number;
    creationDate:string;
    difficulte: number
  }): Observable<Project> {
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

  //Ajouter une etoile à un projet
  addEtoile(projectId: String): Observable<any> {
    const url = `${this.apiUrl}/${projectId}/like`;
    return this.http.patch(url, {});
  }

  //Vérifier si un utilisateur a déjà ajouté une etoile à un projet

  //Vérifier si un utilisateur participe déjà à un projet
  checkParticipation(projectId: string): Observable<boolean> {
  const url = `${this.apiUrl}/${projectId}/check-user`;
  return this.http.get<boolean>(url);
  }

  
}