import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar', // Sélecteur pour utiliser ce composant dans les templates HTML
  templateUrl: './nav-bar.component.html', // Chemin vers le template HTML de ce composant
  styleUrl: './nav-bar.component.css' // Chemin vers le fichier CSS de ce composant (devrait être styleUrls)
})
export class NavBarComponent {

  // Injection du service d'authentification dans le constructeur
  constructor(private authService: AuthService) { }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    this.authService.logout(); // Appel de la méthode logout du service d'authentification
    localStorage.clear(); // Effacement des données de session dans le localStorage
  }
}
