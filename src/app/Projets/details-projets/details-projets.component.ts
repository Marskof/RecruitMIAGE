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

  participerProjet(): void {
    // Implement logic to participate in the project
  }

  modifierProjet(): void {
    if (this.selectedProject) {
      this.router.navigate(['/modifier-projet', this.selectedProject._id]);
    }
  }

  estCreateurProjet(): boolean {
    return !!this.selectedProject; // Simplified for now
  }

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
