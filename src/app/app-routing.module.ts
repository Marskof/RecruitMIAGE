import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeProjetComponent } from './liste-projet/liste-projet.component';
import { DetailsProjetsComponent } from './details-projets/details-projets.component';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import{FormulaireConnexionComponent} from './connexion/formulaire-connexion/formulaire-connexion.component';


const routes: Routes = [
  {path: '',component: AppComponent},
  {path: 'connexion', component: FormulaireConnexionComponent},
  {path: 'liste-projet', component: ListeProjetComponent},
  {path: 'details/:id', component: DetailsProjetsComponent},
  {path: 'inscription', component: InscriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
