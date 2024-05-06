
import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { utilisateur } from '../models/authentification';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/authentification'; 
  currentUserKey = 'currentUser';
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
  AppartientProjet(userId: string, projectId: string): Observable<boolean> {
    const url = `${this.apiUrl}/${userId}/projets/${projectId}/check`;
    return this.http.get<boolean>(url);
  }
  checkUserExist(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/checkUser`;
    return this.http.post<any>(url, { username, password });
  }

  checkInfosUser(usernameOrEmail: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/checkInfosUser`;
    return this.http.post<any>(url, { usernameOrEmail, password })

  }

  setCurrentUserId(userId: string): void {
    localStorage.setItem(this.currentUserKey, userId);
  }

  getCurrentUserId(): string | null {
    return localStorage.getItem(this.currentUserKey);
  }

  clearCurrentUserId(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }


}
