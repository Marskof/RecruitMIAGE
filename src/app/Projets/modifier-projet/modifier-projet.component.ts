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
    etoiles: 0
  };

  // Déclarez les propriétés correspondant aux champs du formulaire
  nomProjet: string = '';
  descriptionProjet: string = '';
  githubUrl: string = '';
  languages: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.projectService.getProjectById(projectId).subscribe(project => {
        this.projetModifie = project;
        // Mettez à jour les propriétés avec les valeurs du projet
        this.nomProjet = project.name;
        this.descriptionProjet = project.description;
        this.githubUrl = project.githubUrl;
        this.languages = project.languages.join(', '); // Convertit le tableau de langages en chaîne séparée par des virgules
      });
    });
  }

  modifierProjet(): void {
    // Mettez à jour les propriétés du projet modifié avec les valeurs des champs de formulaire
    this.projetModifie.name = this.nomProjet;
    this.projetModifie.description = this.descriptionProjet;
    this.projetModifie.githubUrl = this.githubUrl;
    this.projetModifie.languages = this.languages.split(',').map(lang => lang.trim()); // Convertit la chaîne de langages en tableau en supprimant les espaces autour de chaque langage

    // Appelez la méthode de service pour mettre à jour le projet dans le backend
    this.projectService.updateProject(this.projetModifie).subscribe(() => {
      // Rediriger l'utilisateur vers la page de détails du projet
      this.router.navigate(['/details', this.projetModifie._id]);
    }, error => {
      console.error('Erreur lors de la modification du projet :', error);
    });
  }
}
