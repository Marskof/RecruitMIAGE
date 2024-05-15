//imports :
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent implements OnInit {
  // déclarations : 
  username: string = ''; 
  password: string = '';
  errorMessage: string = '';
  currentUser : any;

  constructor(private connexionService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.connexionService.getCurrentUserId();
    console.log("utilisateur courant: " + this.currentUser);
  }

  
  login() {
    // Réinitialiser le message d'erreur de connexion
    this.errorMessage = '';
  
    // Vérifier si les champs username et password sont remplis
    if (!this.username || !this.password) {
      console.error("Veuillez remplir tous les champs.");
      return;
    }
  
    console.log("Informations d'identification:", this.username, this.password, this.currentUser);
  
    // Appeler le service d'authentification pour vérifier les infos de connexion
    this.connexionService.checkInfosUser(this.username, this.password)
      .subscribe(
        (response: any) => {
          console.log("Réponse du service d'authentification:", response);
          //vérif si connexion réussie
          if (response && response.user && response.user._id && response.message === 'Connexion réussie') {
            const userId = response.user._id;
            const username = response.user.username;
            console.log("ID de l'utilisateur actuel:", userId);
            console.log("Nom de l'utilisateur actuel:", username);
  
            // Stocker l'ID de l'utilisateur dans le localStorage
            this.connexionService.setCurrentUserId(userId);
            this.connexionService.setCurrentUsername(username);

  
            // Redirection vers la page liste-projet
            this.router.navigate(['/liste-projet']);
          } else {
            // Affichage d'un message d'erreur en cas d'échec de la connexion
            console.error("Connexion échouée:", response);
            this.errorMessage = 'Mot de passe ou utilisateur incorrect';
          }
        },
        (error) => {
          // En cas d'erreur, affichage d'un message d'erreur
          console.error("Erreur lors de la tentative de connexion:", error);
          if (error.status === 404) {
            this.errorMessage = 'Nom d\'utilisateur ou email incorrect';
          } else if (error.status === 401) {
            this.errorMessage = 'Mot de passe incorrect';
          } else {
            this.errorMessage = 'Nom d\'utilisateur ou email incorrect';
          }
        }
      );
  }
  
  

  onSubmit() {
    // Méthode pour lors de la soumission du formulaire
    console.log('Formulaire soumis');
    this.login(); // Appeler la méthode de connexion
  }

  // méthodes de navigations
  navigateToInscription() {
    this.router.navigate(['/inscription']);
  }

  navigateToProjects() {
    this.router.navigate(['/liste-projet']);
  }

//méthode de déconnexion
  logout(): void {
    this.connexionService.logout();
  }
}
