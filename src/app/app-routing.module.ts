import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmComponent} from "./components/film/film.component";
import {CharacterComponent} from "./components/character/character.component";
import {CharacterResolver} from "./components/character/character.resolver";

const routes: Routes = [
  {
    path: '',
    component: FilmComponent
  },
  {
    path: 'character',
    component: CharacterComponent,
    resolve: [CharacterResolver]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
