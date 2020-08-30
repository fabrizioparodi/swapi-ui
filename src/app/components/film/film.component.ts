import {Component, OnInit} from '@angular/core';
import {FilmService} from "./film.service";
import {Film} from "../shared/model/film";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from '@ngrx/store';
import {AppState, SwapiState} from "../../core/store/swapi.state";
import * as SwapiActions from "../../core/store/swapi.actions";
import {MatDialog} from "@angular/material/dialog";
import {AnimatedOpeningComponent} from "../shared/animated-opening/animated-opening.component";
import {selectSwapi} from "../../core/store/swapi.selectors";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  state$: Observable<SwapiState>;

  constructor(private filmService: FilmService,
              private router: Router,
              private store: Store<AppState>,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.state$ = this.store.select(selectSwapi);
    this.store.dispatch(SwapiActions.BeginGetFilmsAction());
  }

  goToCharacters(film: Film) {
    this.store.dispatch(SwapiActions.BeginGetCharactersByFilmAction(film));
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
