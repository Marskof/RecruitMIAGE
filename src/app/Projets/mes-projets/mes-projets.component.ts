import {Component, OnInit} from '@angular/core'; // Importation des décorateurs Component et OnInit depuis Angular core
import {ActivatedRoute, Router} from '@angular/router'; // Importation des services ActivatedRoute et Router pour la navigation
import { ProjectService } from '../../services/project.service'; // Importation du service ProjectService pour gérer les projets
import {Project} from "../../models/projets";  // Importation du modèle Project
import {AuthService} from "../../services/auth.service"; // Importation du service AuthService pour l'authentification

@Component({
  selector: 'app-mes-projets',
  templateUrl: './mes-projets.component.html',
  styleUrl: './mes-projets.component.css'
})
export class MesProjetsComponent implements OnInit{
  projects: Project[] = [];

  // Injection des services nécessaires via le constructeur
  constructor(private router: Router, private projectService: ProjectService, private route: ActivatedRoute,
              protected authService: AuthService) { }

  // Méthode appelée à l'initialisation du composant
  ngOnInit(): void {
    this.getProjectList();
  }

  // Méthode  pour récupérer la liste des projets depuis le service
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

  // Méthode pour afficher les détails d'un projet spécifique
  showProjectDetails(project: Project): void {
    console.log(project._id);
    this.router.navigate(['/details', project._id]);
  }

  protected readonly String = String;
}
