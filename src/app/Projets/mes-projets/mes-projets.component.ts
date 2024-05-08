import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProjectService } from '../../services/project.service';
import {Project} from "../../models/projets";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-mes-projets',
  templateUrl: './mes-projets.component.html',
  styleUrl: './mes-projets.component.css'
})
export class MesProjetsComponent implements OnInit{

  projects: Project[] = [];
  userParticipeProjet: boolean = false;

  constructor(private router: Router, private projectService: ProjectService,    private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getProjectList();
  }

  test() : void{
    const currentUsername = this.authService.getCurrentUsername();
    if(this.authService.getCurrentUserId() === currentUsername){}
  }

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


  showProjectDetails(project: Project): void {
    console.log(project._id);
    this.router.navigate(['/details', project._id]);
  }

  //Ajouter filtre pour filtrer selon les projets java etc, nombre de participants, nombre d'etoiles, last update




}
