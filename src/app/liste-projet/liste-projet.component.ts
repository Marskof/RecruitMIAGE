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
    console.log(project.id); //test
    console.log("Type de project.id :", typeof project.id); // Affiche le type de project.id dans la console

  }

  getImageForProject(project: any): string {
    switch(project.language) {
      case 'Java':
        return 'assets/images/imgJava.jpg';
      case 'JavaScript':
        return 'assets/images/imgJS.jpg';
      case 'Python':
        return 'assets/images/imgPython.png';
      default:
        return 'assets/images/defaultImage.jpg';
    }
  }
}
