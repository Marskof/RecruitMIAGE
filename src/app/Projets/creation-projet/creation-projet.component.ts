import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-creation-projet',
  templateUrl: './creation-projet.component.html',
  styleUrls: ['./creation-projet.component.css']
})
export class CreationProjetComponent {
  // Propriétés pour stocker les valeurs saisies dans le formulaire
  name: string = '';
  description: string = '';
  matieres: string = '';
  nombrePlaces: number = 1; // Valeur par défaut
  difficulte: number = 1; // Valeur par défaut

  constructor(private router: Router, private projectService: ProjectService) { }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit() {
    // Création d'un objet contenant les données du projet
    const newProject = {
      name: this.name,
      description: this.description,
      matieres: this.matieres,
      nombrePlaces: this.nombrePlaces,
      difficulte: this.difficulte
    };

    // Appel du service pour enregistrer le nouveau projet
    this.projectService.addProject(newProject).subscribe(
      (response) => {
        // Gérer la réponse du serveur si nécessaire
        console.log('Projet enregistré avec succès:', response);
        // Redirection vers une autre page par exemple
        this.router.navigate(['/autre-page']);
      },
      (error) => {
        // Gérer les erreurs éventuelles
        console.error('Erreur lors de l\'enregistrement du projet:', error);
      }
    );
  }
}
