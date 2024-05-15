import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/projets'; 

@Component({
  selector: 'app-liste-projet',
  templateUrl: './liste-projet.component.html',
  styleUrls: ['./liste-projet.component.css']
})
export class ListeProjetComponent implements OnInit {
  projects: Project[] = [];

  constructor(private router: Router, private projectService: ProjectService) { }

  // Méthode appelée à l'initialisation du composant
  ngOnInit(): void {
    this.getProjectList();
  }

  // Récupère la liste des projets
  async getProjectList(): Promise<void> {
    try {
      const projects = await this.projectService.getProjects().toPromise();
      if (projects) {
        this.projects = projects;

      } else {
        console.error('La liste des projets est vide.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des projets :', error);
    }
  }
  
  // Méthode pour afficher les détails d'un projet
  showProjectDetails(project: Project): void {
    console.log(project._id);
    this.router.navigate(['/details', project._id]);
  }


}
