import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { utilisateur } from '../../models/authentification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})

// class MonProfilComponent 
export class MonProfilComponent implements OnInit {
  utilisateur: utilisateur = {
    _id: '',
    nom: '',
    prenom: '',
    username: '',
    email: '',
    password: '',
    cgu: false // cgu = conditions générales d'utilisation
  };
  nouveauMotDePasse: string = '';


  constructor(private authService: AuthService, private router : Router) { }


  
  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.authService.getUserById(userId).subscribe((user) => {
        this.utilisateur = user;
      });
    }
  }

  // Mets à jour les informations de l'utilisateur
  updateUserInfo(): void {
    if (this.nouveauMotDePasse) {
      this.utilisateur.password = this.nouveauMotDePasse;
    }

    this.authService.updateUser(this.utilisateur._id, this.utilisateur).subscribe(() => {
      console.log('Informations utilisateur mises à jour avec succès');
      this.router.navigate(['/liste-projet']); 
    }, (error) => {
      console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
    });
  }
}
