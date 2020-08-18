import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, ReplaySubject} from "rxjs";
import {Film} from "../shared/model/film";
import {ApiResponse} from "../shared/model/api.response";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private dataSubject$ = new ReplaySubject<Film[]>(1);
  private _results: Film[];

  constructor(private http: HttpClient) {
  }

  private fetchFilms() {
    return this.http.get<ApiResponse<Film[]>>(`${environment.swapiUrl}/films/`)
      .subscribe(res => {
        this.dataSubject$.next(res.results);
        this._results = res.results;
      });
  }

  getFilms(): Observable<Film[]> {
    if (!this._results) {
      this.fetchFilms();
    }
    return this.dataSubject$.asObservable();
  }
}
