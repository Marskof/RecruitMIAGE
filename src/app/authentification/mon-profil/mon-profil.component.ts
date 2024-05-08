import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { utilisateur } from '../../models/authentification';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilComponent implements OnInit {
  utilisateur: utilisateur = {
    nom: '',
    prenom: '',
    username: '',
    email: '',
    password: '',
    cgu: false
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.authService.getUserById(userId).subscribe((user) => {
        this.utilisateur = user;
      });
    }
  }
}
