import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeProjetComponent } from './Projets/liste-projet/liste-projet.component';
import { DetailsProjetsComponent } from './Projets/details-projets/details-projets.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { FormulaireConnexionComponent } from './authentification/connexion/formulaire-connexion/formulaire-connexion.component';
import { AppComponent } from './app.component';
import { CreationProjetComponent } from './Projets/creation-projet/creation-projet.component';

const routes: Routes = [
  {path: '',component: FormulaireConnexionComponent},
  {path: 'connexion', component: FormulaireConnexionComponent},
  {path: 'liste-projet', component: ListeProjetComponent},
  {path: 'details/:id', component: DetailsProjetsComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'creation-projet', component: CreationProjetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
