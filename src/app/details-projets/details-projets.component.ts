import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-details-projets',
  templateUrl: './details-projets.component.html',
  styleUrls: ['./details-projets.component.css'] 
})
export class DetailsProjetsComponent implements OnInit {
  @Input() project!: any;

  selectedProject: any; 

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    console.log("test");
    this.route.params.subscribe(params => {
      const projectId = Number(params['id']);
      console.log(projectId+"test");
      this.selectedProject = this.projectService.getProjectById(projectId);
    });
  }
  
}
