import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../models/projets';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-details-projets',
  templateUrl: './details-projets.component.html',
  styleUrls: ['./details-projets.component.css']
})
export class DetailsProjetsComponent implements OnInit {
  selectedProject: Project | undefined;
  estLike: boolean = false;
  userParticipeProjet: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      const userId = this.authService.getCurrentUserId(); // Corrected: Call getCurrentUserId as a method
      this.projectService.getProjectById(projectId).subscribe(project => {
        this.selectedProject = project;
        if (this.selectedProject && userId) { // Ensure userId exists
          this.authService.AppartientProjet(userId, projectId).subscribe(result => {
            this.userParticipeProjet = result;
          });
        }
      });
    });
  }



  // Méthode pour revenir à la liste des projets
  revenirPageListeProjets(): void {
    this.router.navigate(['/liste-projet']);
  }

  // Méthode pour liker un projet
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

  // Methode pour participer à un projet
  participerProjet(): void {
    const currentUsername = this.authService.getCurrentUsername();
    if (!currentUsername) {
      console.error("L'utilisateur n'est pas connecté.");
      return;
    }

    if (!this.selectedProject) {
      console.error("Aucun projet sélectionné.");
      return;
    }

    if (this.selectedProject.contributors.length >= this.selectedProject.nombrePlaces) {
      console.error("Nombre maximum de contributeurs atteint pour ce projet.");
      return;
    }

    this.selectedProject.contributors.push(currentUsername);

    this.projectService.updateProject(this.selectedProject).subscribe(
      () => {
        console.log("L'utilisateur a été ajouté avec succès aux contributeurs du projet.");
        this.userParticipeProjet = true;
      },
      error => {
        console.error("Erreur lors de l'ajout de l'utilisateur aux contributeurs du projet :", error);
      }
    );
  }

  // Methode pour ne plus participer à un projet
  nePlusParticiperProjet(): void {
    const currentUsername = this.authService.getCurrentUsername();
    if (!currentUsername) {
      console.error("L'utilisateur n'est pas connecté.");
      return;
    }

    if (!this.selectedProject) {
      console.error("Aucun projet sélectionné.");
      return;
    }

    const index = this.selectedProject.contributors.indexOf(currentUsername);
    if (index !== -1) {
      this.selectedProject.contributors.splice(index, 1);

      this.projectService.updateProject(this.selectedProject).subscribe(
        () => {
          console.log("L'utilisateur a été retiré avec succès des contributeurs du projet.");
          this.userParticipeProjet = false;
        },
        error => {
          console.error("Erreur lors de la suppression de l'utilisateur des contributeurs du projet :", error);
        }
      );
    }
  }


  // Méthode pour modifier un projet
  modifierProjet(): void {
    if (this.selectedProject) {
      this.router.navigate(['/modifier-projet', this.selectedProject._id]);
    }
  }

  // Méthode pour verifier si l'utilisateur est le créateur du projet
  estCreateurProjet(): boolean {
    const currentUsername = this.authService.getCurrentUsername();
    return !!currentUsername && !!this.selectedProject && currentUsername === this.selectedProject.creator;
  }


  // Méthode pour supprimer un projet
  supprimerProjet(): void {
    if (this.selectedProject && this.estCreateurProjet()) {
      this.projectService.deleteProject(this.selectedProject._id).subscribe(
        () => {
          this.router.navigate(['/liste-projet']);
        },
        error => {
          console.error('Erreur lors de la suppression du projet :', error);
        }
      );
    } else {
      console.error('Vous n\'êtes pas autorisé à supprimer ce projet.');
    }
  }
}
