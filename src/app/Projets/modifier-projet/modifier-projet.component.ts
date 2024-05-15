import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/projets';

@Component({
  selector: 'app-modifier-projet',
  templateUrl: './modifier-projet.component.html',
  styleUrls: ['./modifier-projet.component.css']
})
export class ModifierProjetComponent implements OnInit {
  projetModifie: Project = {
    _id: '',
    name: '',
    creator: '',
    creationDate: new Date(),
    description: '',
    contributors: [],
    lastUpdate: new Date(),
    languages: [],
    githubUrl: '',
    image: '',
    etoiles: 0,
    nombrePlaces: 0,
    difficulte: ''
  };

  nomProjet: string = '';
  descriptionProjet: string = '';
  githubUrl: string = '';
  languages: string = '';
  nombrePlaces: number = 0; 
  difficulte: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) { }


    // Méthode appelée à l'initialisation du composant
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.projectService.getProjectById(projectId).subscribe(project => {
        this.projetModifie = project;
        this.nomProjet = project.name;
        this.descriptionProjet = project.description;
        this.githubUrl = project.githubUrl;
        this.languages = project.languages.join(', '); // Convertit le tableau en chaîne séparée par des virgules, donc on doit mettre des virgules après chaque langage
        this.nombrePlaces = project.nombrePlaces; 
        this.difficulte = project.difficulte;
      });
    });
  }

  // Méthode pour modifier un projet
  modifierProjet(): void {
    this.projetModifie.name = this.nomProjet;
    this.projetModifie.description = this.descriptionProjet;
    this.projetModifie.githubUrl = this.githubUrl;
    this.projetModifie.languages = this.languages.split(',').map(lang => lang.trim()); // Convertit la chaîne en tableau en supprimant les espaces autour de chaque langage
    this.projetModifie.nombrePlaces = this.nombrePlaces; 
    this.projetModifie.difficulte = this.difficulte;
    
    this.projectService.updateProject(this.projetModifie).subscribe(() => {
      this.router.navigate(['/details', this.projetModifie._id]);
    }, error => {
      console.error('Erreur lors de la modification du projet :', error);
    });
  }
}
