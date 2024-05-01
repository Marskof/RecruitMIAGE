import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../models/projets'; // Assurez-vous d'avoir un modèle de projet correspondant dans votre application Angular

@Component({
  selector: 'app-details-projets',
  templateUrl: './details-projets.component.html',
  styleUrls: ['./details-projets.component.css'] 
})
export class DetailsProjetsComponent implements OnInit {
  selectedProject: Project | undefined; // Assurez-vous d'avoir importé le modèle Project
  estLike: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    console.log("Ng on init de detail est executé");
    this.route.params.subscribe(params => {
      const projectId = params['id']; // Pas besoin de le convertir en nombre
      this.projectService.getProjectById(projectId).subscribe(project => {
        this.selectedProject = project;
      });
    });
  }
  
  // Fonction qui permet de retourner à la page précédente
  revenirPageListeProjets(): void {
    this.router.navigate(['/liste-projet']);
  }

  likeProject(): void {
    if(this.selectedProject && !this.estLike) {
      this.selectedProject.etoiles++;
      this.estLike = true;
    }
  }
}
