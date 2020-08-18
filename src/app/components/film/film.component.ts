import {Component, OnInit} from '@angular/core';
import {FilmService} from "./film.service";
import {Film} from "../shared/model/film";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {select, Store} from '@ngrx/store';
import {SwapiState} from "../../core/store/swapi.state";
import {BeginGetCharactersByIdAction, BeginGetFilmsAction, GetCharacterAction} from "../../core/store/swapi.actions";
import {MatDialog} from "@angular/material/dialog";
import {AnimatedOpeningComponent} from "../shared/animated-opening/animated-opening.component";
import {AppState, selectSwapi} from "../../core/store/swapi.selectors";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  state$: Observable<SwapiState>;
  films: Film[];

  constructor(private filmService: FilmService,
              private router: Router,
              private store: Store<AppState>,
              private dialog: MatDialog) {
    this.state$ = store.pipe(select(selectSwapi));
  }

  ngOnInit(): void {
    this.store.dispatch(BeginGetFilmsAction());
    this.state$.subscribe(state => {
      this.films = state.films;
    });
  }

  goToCharacters(film: Film) {
    const ids = film.characters.map(f => f.replace(/\D/g, ''));
    this.store.dispatch(GetCharacterAction());
    this.store.dispatch(BeginGetCharactersByIdAction({
      payload: {
        selectedFilm: film,
        ids: ids
      }
    }));
    this.router.navigate(['character']);
  }

  showFilmOpening(elem: Film) {
    this.dialog.open(AnimatedOpeningComponent, {
      data: elem,
      width: '850px',
      height: '500px'
    });
  }

}
