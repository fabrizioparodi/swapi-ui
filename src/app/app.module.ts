import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FilmComponent} from './components/film/film.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {CharacterComponent} from './components/character/character.component';
import {HeaderComponent} from './core/header/header.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {HttpStatusInterceptor} from "./core/interceptor/http.status.interceptor";
import {MatPaginatorModule} from "@angular/material/paginator";
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducer} from "./core/store/swapi.reducers";
import {EffectsModule} from "@ngrx/effects";
import {SwapiEffects} from "./core/store/swapi.effects";
import {AnimatedOpeningComponent} from './components/shared/animated-opening/animated-opening.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {environment} from "../environments/environment";
import {ServiceWorkerModule} from "@angular/service-worker";

@NgModule({
  declarations: [
    AppComponent,
    FilmComponent,
    CharacterComponent,
    HeaderComponent,
    AnimatedOpeningComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    StoreModule.forRoot({state: reducer}),
    EffectsModule.forRoot([SwapiEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpStatusInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
