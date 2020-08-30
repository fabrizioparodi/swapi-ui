import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {AppState} from "../../core/store/swapi.state";
import * as SwapiActions from "../../core/store/swapi.actions";

@Injectable({
  providedIn: 'root'
})
export class CharacterResolver implements Resolve<any> {
  constructor(private store: Store<AppState>, private actions$: Actions) {
  }

  resolve() {
    this.store.dispatch(SwapiActions.BeginGetFilmsAction());
    return this.actions$.pipe(
      ofType(SwapiActions.SuccessGetFilmAction, SwapiActions.SuccessGetCharacterAction),
      take(1)
    );
  }
}
