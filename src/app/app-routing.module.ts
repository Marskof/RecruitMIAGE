import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeProjetComponent } from './liste-projet/liste-projet.component';
import { DetailsProjetsComponent } from './details-projets/details-projets.component';



const routes: Routes = [
  {path: '',component: ListeProjetComponent},
  {path: 'details/:id', component: DetailsProjetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
