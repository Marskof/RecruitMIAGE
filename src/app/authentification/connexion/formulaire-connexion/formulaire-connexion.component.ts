// formulaire-connexion.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent {
  constructor(private router: Router) { }

  onSubmit() {
    // Logique de gestion de la soumission du formulaire
    console.log('Formulaire soumis');
  }

  navigateToInscription() {
    this.router.navigate(['/inscription']);
  }
  
}
