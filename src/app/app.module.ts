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
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DetailsProjetsComponent,
    ListeProjetComponent,
    InscriptionComponent,
    CreationProjetComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
