import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from "rxjs";
import {Film} from "../shared/model/film";
import {ApiResponse} from "../shared/model/api.response";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private readonly dataSubject$ = new ReplaySubject<ApiResponse<Film[]>>(1);

  constructor(private http: HttpClient) {
    this.fetchFilms();
  }

  fetchFilms() {
    this.http
      .get<ApiResponse<Film[]>>(`${environment.swapiUrl}/films/`)
      .subscribe(this.dataSubject$);
  }

  getFilms() {
    return this.dataSubject$.asObservable();
  }
}
