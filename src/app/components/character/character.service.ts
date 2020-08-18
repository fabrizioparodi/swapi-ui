import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "../shared/model/character";
import {ApiResponse} from "../shared/model/api.response";
import {environment} from "../../../environments/environment";
import {Film} from "../shared/model/film";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  films: Film[];

  constructor(private http: HttpClient) {
  }

  getCharactersByIds(ids: string[]): Promise<Character[]> {
    const promises = ids.map(id => this.http.get<Character>(`${environment.swapiUrl}/people/${id}`).toPromise());
    return Promise.all(promises).then(([...characters]) => {
      return characters.map(char => {
        char.films.forEach((film: any, idx: number) => {
          const id = Number(film.replace(/\D/g, ''));
          char.films[idx] = this.films.find(film => Number(film.url.replace(/\D/g, '')) === id);
        });
        return char;
      })
    })
  }

  getCharacters(page: number = 1): Promise<ApiResponse<Character[]>> {
    return this.http.get<ApiResponse<Character[]>>(`${environment.swapiUrl}/people/`, {
      params: {
        page: String(page)
      }
    }).toPromise().then(response => {
      response.results.forEach(char => {
        char.films.forEach((film: any, idx: number) => {
          const id = Number(film.replace(/\D/g, ''));
          char.films[idx] = this.films.find(film => Number(film.url.replace(/\D/g, '')) === id);
        })
      });
      return response;
    });
  }

}
