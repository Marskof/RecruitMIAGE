import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { utilisateur } from '../../models/authentification';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  constructor(private router: Router, private authService: AuthService) { }

  navigateToProjects() {
    this.router.navigate(['/liste-projet']);
  }

  utilisateur: utilisateur = {
    nom: '',
    prenom: '',
    username: '',
    email: '',
    password: '',
    cgu: false
  };

  createUser() {
    console.log('Données utilisateur à envoyer : ', this.utilisateur); // Affiche les données dans la console
    this.authService.createUser(this.utilisateur).subscribe(
      (response) => {
        console.log('Réponse du serveur : ', response); // Affiche la réponse du serveur dans la console
        console.log('Utilisateur créé avec succès : ', response);
        // Rediriger ou effectuer d'autres actions après la création de l'utilisateur
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur : ', error);
      }
    );
  }
  


}
