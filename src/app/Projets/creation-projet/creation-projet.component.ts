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
  languages: string[] = [];
  nombrePlaces: number = 1; // Valeur par défaut
  difficulte: string = ''; // Valeur par défaut
  githubUrl : string='https://github.com/';
  etoiles: number = 0;
  creationDate:string =  new Date().toISOString().slice(0, 10);
  image : string ='';

  constructor(private router: Router, private projectService: ProjectService) { }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit() {
    // Création d'un objet contenant les données du projet
    const newProject = {
      name: this.name,
      description: this.description,
      languages: this.languages,
      nombrePlaces: this.nombrePlaces,
      difficulte: this.difficulte,
      githubUrl:this.githubUrl,
      etoiles :this.etoiles,
      creationDate:this.creationDate,
      image:this.image
    };

    // Appel du service pour enregistrer le nouveau projet
    // @ts-ignore
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

  updateLanguages(event: any) {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked && !this.languages.includes(value)) {
      this.languages.push(value);
    } else if (!checked && this.languages.includes(value)) {
      const index = this.languages.indexOf(value);
      this.languages.splice(index, 1);
    }
  }
}
