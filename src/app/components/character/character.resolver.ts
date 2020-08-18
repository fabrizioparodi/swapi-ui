import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Film} from "../shared/model/film";
import {FilmService} from "../film/film.service";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CharacterResolver implements Resolve<Film[]> {
  constructor(private filmService: FilmService) {
  }

  resolve() {
    return this.filmService.getFilms().pipe(first());
  }
}
