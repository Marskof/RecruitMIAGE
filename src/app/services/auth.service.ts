import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { utilisateur } from '../models/authentification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/authentification';
  private currentUserKey = 'currentUser';

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
    return this.http.post<any>(url, { usernameOrEmail, password });
  }

  setCurrentUserId(userId: string): void {
    this.setStorageItem(this.currentUserKey, userId);
  }

  getCurrentUserId(): string | null {
    return this.getStorageItem(this.currentUserKey);
  }

  clearCurrentUserId(): void {
    this.removeStorageItem(this.currentUserKey);
  }

  logout(): void {
    this.removeStorageItem(this.currentUserKey);
  }

  private setStorageItem(key: string, value: string): void {
    if (localStorage) {
      localStorage.setItem(key, value);
    } else {
      console.error('localStorage is not available.');
      // Handle fallback mechanism if localStorage is not available
    }
  }

  private getStorageItem(key: string): string | null {
    if (localStorage) {
      return localStorage.getItem(key);
    } else {
      console.error('localStorage is not available.');
      return null; // or return from memory or another appropriate fallback
    }
  }

  private removeStorageItem(key: string): void {
    if (localStorage) {
      localStorage.removeItem(key);
    } else {
      console.error('localStorage is not available.');
      // Handle fallback mechanism if localStorage is not available
    }
  }
}
