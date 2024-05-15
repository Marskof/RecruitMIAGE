import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsProjetsComponent } from './Projets/details-projets/details-projets.component';
import { ListeProjetComponent } from './Projets/liste-projet/liste-projet.component';
import { CreationProjetComponent } from './Projets/creation-projet/creation-projet.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { NavBarComponent } from './commun/nav-bar/nav-bar.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModifierProjetComponent } from './Projets/modifier-projet/modifier-projet.component';

import { CommonModule } from '@angular/common';
import { FormulaireConnexionComponent } from './../app/authentification/connexion/formulaire-connexion/formulaire-connexion.component';
import { HeaderFooterComponent } from './commun/header-footer/header-footer.component';
import { MesProjetsComponent } from './Projets/mes-projets/mes-projets.component';
import { MonProfilComponent } from './authentification/mon-profil/mon-profil.component'; // Assurez-vous d'importer le composant


@NgModule({
  declarations: [
    AppComponent,
    DetailsProjetsComponent,
    ListeProjetComponent,
    InscriptionComponent,
    CreationProjetComponent,
    NavBarComponent,
    ModifierProjetComponent,
    FormulaireConnexionComponent,
    HeaderFooterComponent,
    MesProjetsComponent,
    MonProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    CommonModule

  ],
  exports: [
    FormulaireConnexionComponent 
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class FormulaireConnexionModule { }