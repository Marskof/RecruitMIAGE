import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-projets',
  templateUrl: './details-projets.component.html',
  styleUrls: ['./details-projets.component.css'] 
})
export class DetailsProjetsComponent implements OnInit {
  selectedProject: any; 
  estLike: boolean = false;

  constructor(private router: Router,private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    console.log("Ng on init de detail est executé");
    this.route.params.subscribe(params => {
      const projectId = Number(params['id']);
      this.selectedProject = this.projectService.getProjectById(projectId);
    });
  }
  
  // Fonction qui permet de retourner à la page précédente
  revenirPageListeProjets(): void {
    this.router.navigate(['/liste-projet']);

  }

  likeProject(): void {
    if(this.estLike===false){
      this.selectedProject.etoiles++;
      this.estLike=true;
    }
  }
}
