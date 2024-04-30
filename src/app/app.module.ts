import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsProjetsComponent } from './details-projets/details-projets.component';
import { ListeProjetComponent } from './liste-projet/liste-projet.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CreationProjetComponent } from './creation-projet/creation-projet.component';
import { NavBarComponentComponent } from './nav-bar-component/nav-bar-component.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsProjetsComponent,
    ListeProjetComponent,
    InscriptionComponent,
    CreationProjetComponent,
    NavBarComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
