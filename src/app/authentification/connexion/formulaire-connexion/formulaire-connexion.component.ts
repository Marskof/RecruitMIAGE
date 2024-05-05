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
  noconnexion = false;

  constructor(private connexionService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialisation
  }

  login() {
    // Réinitialiser le drapeau d'erreur de connexion
    this.noconnexion = false;

    // Vérifier si les champs username et password sont remplis
    if (!this.username || !this.password) {
      console.error("Veuillez remplir tous les champs.");
      return;
    }

    this.connexionService.checkUserExist(this.username, this.password).subscribe(
      (response: any) => {
        // Vérifier le code de réponse
        if (response && response.message === 'Utilisateur trouvé') {
          // Rediriger vers la page liste-projet
          this.router.navigate(['/liste-projet']);
        } else {
          // Sinon, rediriger vers la page d'inscription
          this.router.navigate(['/inscription']);
        }
      },
      (error) => {
        // En cas d'erreur, afficher un message d'erreur
        console.error("Erreur lors de la tentative de connexion:", error);
        this.noconnexion = true;
      }
    );
  }

  onSubmit() {
    // Logique de gestion de la soumission du formulaire
    console.log('Formulaire soumis');
  }

  navigateToInscription() {
    this.router.navigate(['/inscription']);
  }

  navigateToProjects() {
    this.router.navigate(['/liste-projet']);
  }
}
