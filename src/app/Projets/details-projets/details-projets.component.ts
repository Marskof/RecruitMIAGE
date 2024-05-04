import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../models/projets';

@Component({
  selector: 'app-details-projets',
  templateUrl: './details-projets.component.html',
  styleUrls: ['./details-projets.component.css'] 
})
export class DetailsProjetsComponent implements OnInit {
  selectedProject: Project | undefined;
  estLike: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.projectService.getProjectById(projectId).subscribe(project => {
        this.selectedProject = project;
      });
    });
  }
  
  revenirPageListeProjets(): void {
    this.router.navigate(['/liste-projet']);
  }

  likeProject(): void {
    if (this.selectedProject && !this.estLike) {
      this.projectService.addEtoile(this.selectedProject._id).subscribe(
        () => {
          if (this.selectedProject) {
            this.selectedProject.etoiles++;
            this.estLike = true;
          }
        },
        error => {
          console.error('Erreur lors de la tentative de like :', error);
        }
      );
    }
  }
  
  // Fonction pour participer au projet
  participerProjet(): void {
  }

  modifierProjet(): void {
    // Redirige l'utilisateur vers la page de modification du projet avec l'ID du projet
    if (this.selectedProject) {
      this.router.navigate(['/modifier-projet', this.selectedProject._id]);
    }
  }
  

  estCreateurProjet(): boolean {
    // Le !! verifie si la valeur est 
    //return !!this.selectedProject && this.selectedProject.creator === "Nom de l'utilisateur connecté";

    return !!this.selectedProject;
  }
  

  supprimerProjet(): void {
    if (this.selectedProject && this.estCreateurProjet()) {
        this.projectService.deleteProject(this.selectedProject._id).subscribe(() => {
            // Rediriger l'utilisateur vers la page de liste des projets après la suppression du projet
            this.router.navigate(['/liste-projet']);
        }, error => {
            console.error('Erreur lors de la suppression du projet :', error);
        });
    } else {
        console.error('Vous n\'êtes pas autorisé à supprimer ce projet.');
    }
}


//rajouter bouton participer au projet
  
}
