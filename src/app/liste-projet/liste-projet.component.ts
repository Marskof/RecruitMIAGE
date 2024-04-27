import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-liste-projet',
  templateUrl: './liste-projet.component.html',
  styleUrls: ['./liste-projet.component.css']
})
export class ListeProjetComponent implements OnInit {
  projects: any[] = []; 

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }

  showProjectDetails(project: any): void {
    this.router.navigate(['/details', project.id]);
  }


}
