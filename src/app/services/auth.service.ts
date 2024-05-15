import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { utilisateur } from '../models/authentification';

// Injectable permet de declarer un service dans un module
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/authentification'; // URL de l'API
  private currentUserKey = 'currentUser'; // recupère l'id de l'utilisateur connecté
  private currentUsername = 'currentUsername'; // recupère le nom de l'utilisateur connecté

  constructor(private http: HttpClient) { }

  // Les methodes de l'API

  // Creer un utilisateur
  createUser(user: utilisateur): Observable<utilisateur> {
    return this.http.post<utilisateur>(`${this.apiUrl}`, user);
  }

  // Recuperer tous les utilisateurs
  getAllUsers(): Observable<utilisateur[]> {
    return this.http.get<utilisateur[]>(`${this.apiUrl}`);
  }

  // Recuperer un utilisateur par son id
  getUserById(id: string): Observable<utilisateur> {
    return this.http.get<utilisateur>(`${this.apiUrl}/${id}`);
  }

  // Mettre a jour un utilisateur
  updateUser(id: string, user: utilisateur): Observable<utilisateur> {
    return this.http.put<utilisateur>(`${this.apiUrl}/${id}`, user);
  }

  // Supprimer un utilisateur
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // A tester je dois verifier si on s'en sert
  AppartientProjet(userId: string, projectId: string): Observable<boolean> {
    const url = `${this.apiUrl}/${userId}/projets/${projectId}/check`;
    return this.http.get<boolean>(url);
  }

  // Verifier si un utilisateur existe
  checkUserExist(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/checkUser`;
    return this.http.post<any>(url, { username, password });
  }

  // Verifier si les informations de l'utilisateur sont correctes
  checkInfosUser(usernameOrEmail: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/checkInfosUser`;
    return this.http.post<any>(url, { usernameOrEmail, password });
  }

  // Permet de stocker l'id de l'utilisateur connecte avec le local storage
  setCurrentUserId(userId: string): void {
    this.setStorageItem(this.currentUserKey, userId);
  }

  // Permet de recuperer l'id de l'utilisateur connecte avec le local storage
  getCurrentUserId(): string | null {
    return this.getStorageItem(this.currentUserKey);
  }

  // Permet de recuperer le nom de l'utilisateur connecte avec le local storage
  getCurrentUsername(): string | null {
    return this.getStorageItem('currentUsername');
  }
    
  // Permet de stocker le nom de l'utilisateur connecte avec le local storage
  setCurrentUsername(username: string): void {
    this.setStorageItem(this.currentUsername, username);
  }

  // Permet de supprimer l'id de l'utilisateur connecte avec le local storage
  clearCurrentUserId(): void {
    this.removeStorageItem(this.currentUserKey);
  }
// enlever une des deux methodes
  // Permet de supprimer le nom de l'utilisateur connecte avec le local storage
  logout(): void {
    this.removeStorageItem(this.currentUserKey);
  }

  // Permet de stocker les informations de l'utilisateur connecte avec le local storage
  private setStorageItem(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    } 
  }
  
  // Permet de recuperer les informations de l'utilisateur connecte avec le local storage
  private getStorageItem(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    } else {
      return null; 
    }
  }
  
  // Permet de supprimer les informations de l'utilisateur connecte avec le local storage
  private removeStorageItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } 
  }
  
}
