import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeProjetComponent } from './Projets/liste-projet/liste-projet.component';
import { DetailsProjetsComponent } from './Projets/details-projets/details-projets.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { FormulaireConnexionComponent } from './authentification/connexion/formulaire-connexion/formulaire-connexion.component';
import { CreationProjetComponent } from './Projets/creation-projet/creation-projet.component';
import { ModifierProjetComponent } from './Projets/modifier-projet/modifier-projet.component';
import { MesProjetsComponent } from './Projets/mes-projets/mes-projets.component';
import { MonProfilComponent } from './authentification/mon-profil/mon-profil.component';


//faire gaffe au auth guard
const routes: Routes = [
  {path: '',component: FormulaireConnexionComponent},
  {path: 'connexion', component: FormulaireConnexionComponent},
  {path: 'liste-projet', component: ListeProjetComponent},
  {path: 'details/:id', component: DetailsProjetsComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'creation-projet', component: CreationProjetComponent},
  {path: 'mes-projets', component: MesProjetsComponent},
  {path: 'mon-profil', component: MonProfilComponent},
  {path: 'modifier-projet/:id', component: ModifierProjetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
