//imports : 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { utilisateur } from '../../models/authentification';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  constructor(private router: Router, private authService: AuthService) { }

  utilisateur: utilisateur = {
    //déclarations
    _id: '',
    nom: '',
    prenom: '',
    username: '',
    email: '',
    password: '',
    cgu: false
  };

  errorMessage: string = '';
   
  //méthode pour ajouter l'utilisateur à la BD
  createUser() {
    console.log('Données utilisateur à envoyer : ', this.utilisateur);
    this.authService.createUser(this.utilisateur).subscribe(
      (response) => {
        console.log('Réponse du serveur : ', response);
        console.log('Utilisateur créé avec succès : ', response);
        this.router.navigate(['']); // redirection vers la page de connexion
        // Réinitialiser le message d'erreur après une inscription réussie
        this.errorMessage = '';
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur : ', error);
        //vérif si username déjà utilisé
        if (error && error.error && error.error.error === 'Cet utilisateur existe déjà') {
          this.errorMessage = 'Nom d\'utilisateur déjà utilisé';
        } else {
          this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
        }
      }
    );
  }
}
