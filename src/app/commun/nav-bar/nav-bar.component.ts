import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar', 
  templateUrl: './nav-bar.component.html', 
  styleUrl: './nav-bar.component.css' 
})
export class NavBarComponent {

  // Injection du service d'authentification dans le constructeur
  constructor(private authService: AuthService) { }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    this.authService.logout();
    localStorage.clear(); // Effacement des données de session dans le localStorage
  }
}
