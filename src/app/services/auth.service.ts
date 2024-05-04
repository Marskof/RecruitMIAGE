import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { utilisateur } from '../models/authentification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/authentification'; // Mettez à jour l'URL ici

  constructor(private http: HttpClient) { }

  createUser(user: utilisateur): Observable<utilisateur> {
    return this.http.post<utilisateur>(`${this.apiUrl}`, user);
  }

  getAllUsers(): Observable<utilisateur[]> {
    return this.http.get<utilisateur[]>(`${this.apiUrl}`);
  }

  getUserById(id: string): Observable<utilisateur> {
    return this.http.get<utilisateur>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: utilisateur): Observable<utilisateur> {
    return this.http.put<utilisateur>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  // A tester
  // Vérifier si un utilisateur appartient à un projet
  AppartientProjet(userId: string, projectId: string): Observable<boolean> {
    const url = `${this.apiUrl}/${userId}/projects/${projectId}/check`;
    return this.http.get<boolean>(url);
  }
}
