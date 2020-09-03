import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterService} from "./character.service";
import {Character} from "../shared/model/character";
import {Film} from "../shared/model/film";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../core/store/swapi.state";
import {Subscription} from "rxjs";
import {BeginGetCharactersAction} from "../../core/store/swapi.actions";
import {AnimatedOpeningComponent} from "../shared/animated-opening/animated-opening.component";
import {MatDialog} from "@angular/material/dialog";
import {selectSwapi} from "../../core/store/swapi.selectors";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, AfterContentChecked, OnDestroy {
  filterValue: string = '';
  characters: Character[];
  selectedFilm: Film;
  loading: boolean;

  length = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];

  private stateSub: Subscription;

  constructor(private characterService: CharacterService,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.stateSub = this.store
      .select(selectSwapi)
      .subscribe(state => {
        this.characters = state.characters.results;
        this.length = state.characters.count;
        this.selectedFilm = state.selectedFilm;
        this.loading = state.loading;
      })
  }

  search() {
    this.store.dispatch(BeginGetCharactersAction({page: this.pageIndex + 1}));
  }

  filter(characters: Character[]) {
    return characters.filter(char =>
      char.name.toUpperCase().includes(this.filterValue.toUpperCase()) ||
      char.eye_color.toUpperCase().includes(this.filterValue.toUpperCase()) ||
      char.gender.toUpperCase().includes(this.filterValue.toUpperCase()) ||
      char.films.find(f => f.title.toUpperCase().includes(this.filterValue.toUpperCase()))
    );
  }

  showFilmOpening(elem: Film) {
    this.dialog.open(AnimatedOpeningComponent, {
      data: elem,
      width: '850px',
      height: '500px'
    });
  }

  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.search();
  }

  ngAfterContentChecked(): void {
    if (!this.selectedFilm && this.characters.length === 0 && !this.loading) {
      this.search();
    }
  }

  ngOnDestroy(): void {
    if (this.stateSub) {
      this.stateSub.unsubscribe();
    }
  }

}
