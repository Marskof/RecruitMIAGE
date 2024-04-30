import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';


@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrl: './formulaire-connexion.component.css'
})
export class FormulaireConnexionComponent {

  constructor(private router: Router, private projectService: ProjectService) { }

}
