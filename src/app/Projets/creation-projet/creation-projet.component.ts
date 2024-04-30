import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-creation-projet',
  templateUrl: './creation-projet.component.html',
  styleUrl: './creation-projet.component.css'
})
export class CreationProjetComponent {

  constructor(private router: Router, private projectService: ProjectService) { }

}
