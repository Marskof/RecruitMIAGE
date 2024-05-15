import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-creation-projet',
  templateUrl: './creation-projet.component.html',
  styleUrls: ['./creation-projet.component.css']
})
export class CreationProjetComponent {
  // Propriétés pour stocker les valeurs saisies dans le formulaire
  name: string = '';
  // @ts-ignore
  creator : string = this.authService.getCurrentUsername();
  description: string = '';
  languages: string[] = [];
  nombrePlaces: number = 1; // Valeur par défaut
  difficulte: string = ''; // Valeur par défaut
  contributors: string[] = [];
  githubUrl : string='https://github.com/';
  etoiles: number = 0;
  creationDate:string =  new Date().toISOString().slice(0, 10);
  image : string ='';

  constructor(private router: Router, private projectService: ProjectService, protected authService:  AuthService) { }

  // Fonction appelée lors de la soumission du formulaire

  onSubmit() {
    // Création d'un objet contenant les données du projet
    const newProject = {
      name: this.name,
      creator: this.creator,
      description: this.description,
      languages: this.languages,
      nombrePlaces: this.nombrePlaces,
      difficulte: this.difficulte,
      githubUrl:this.githubUrl,
      contributors:this.contributors,
      etoiles :this.etoiles,
      creationDate:this.creationDate,
      image:this.image,

    };
    // @ts-ignore
    this.projectService.addProject(newProject).subscribe(
      (response) => {
        this.router.navigate(['/liste-projet']);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement du projet:', error);
      }
    );
  }

}
