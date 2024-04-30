// formulaire-connexion.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent {
  constructor() { }

  onSubmit() {
    // Logique de gestion de la soumission du formulaire
    console.log('Formulaire soumis');
  }
}
