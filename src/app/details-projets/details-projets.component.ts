import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-details-projets',
  templateUrl: './details-projets.component.html',
  styleUrls: ['./details-projets.component.css'] 
})
export class DetailsProjetsComponent implements OnInit {
  selectedProject: any; 

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    console.log("Ng on init de detail est executé");
    this.route.params.subscribe(params => {
      const projectId = Number(params['id']);
      this.selectedProject = this.projectService.getProjectById(projectId);
    });
  } 
}
