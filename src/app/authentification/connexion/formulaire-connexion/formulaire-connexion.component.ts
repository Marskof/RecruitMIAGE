import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent implements OnInit {
  username: string = ''; 
  password: string = '';
  errorMessage: string = '';

  constructor(private connexionService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialisation
  }

  login() {
    // Réinitialiser le drapeau d'erreur de connexion
    this.errorMessage = '';

    // Vérifier si les champs username et password sont remplis
    if (!this.username || !this.password) {
      console.error("Veuillez remplir tous les champs.");
      return;
    }

    console.log("Informations d'identification:", this.username, this.password); // Ajout du log pour vérifier les informations d'identification

    // Appeler le service d'authentification pour vérifier les informations de connexion
    this.connexionService.checkInfosUser(this.username, this.password)
      .subscribe(
        (response: any) => {
          // Vérifier si l'utilisateur et le mot de passe correspondent
          if (response && response.message === 'Connexion réussie') {
            // Rediriger vers la page liste-projet
            this.router.navigate(['/liste-projet']);
          } else {
            // Afficher un message d'erreur en cas d'échec de la connexion
            console.error("Connexion échouée:", response);
            this.errorMessage = 'Mot de passe ou utilisateur incorrect';
          }
        },
        (error) => {
          // En cas d'erreur, afficher un message d'erreur
          console.error("Erreur lors de la tentative de connexion:", error);
          if (error.status === 404) {
            this.errorMessage = 'Nom d\'utilisateur ou email incorrect';
          } 
          if(error.status === 401) {
            this.errorMessage = 'Mot de passe incorrect';
          }
          else {
            this.errorMessage = 'Nom d\'utilisateur ou email incorrect';
          }
        }
      );
  }

  onSubmit() {
    // Logique de gestion de la soumission du formulaire
    console.log('Formulaire soumis');
    this.login(); // Appeler la méthode de connexion lors de la soumission du formulaire
  }

  navigateToInscription() {
    this.router.navigate(['/inscription']);
  }

  navigateToProjects() {
    this.router.navigate(['/liste-projet']);
  }
}
