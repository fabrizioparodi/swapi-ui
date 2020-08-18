import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpStatusService} from "../http.status.service";
import {Store} from "@ngrx/store";
import {SwapiState} from "../store/swapi.state";
import {BeginGetCharactersAction, GetCharacterAction} from "../store/swapi.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private httpService: HttpStatusService,
              private router: Router,
              private store: Store<{ state: SwapiState }>) {
  }

  ngOnInit(): void {
    this.loading$ = this.httpService.onFlight();
  }

  navigate() {
    this.store.dispatch(GetCharacterAction());
    this.store.dispatch(BeginGetCharactersAction(null));
    this.router.navigate(['character']);
  }

}
