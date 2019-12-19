import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Author} from '../../shared/interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private http: HttpClient
  ) {
  }

  saveAuthor(author: Author) {
    return this.http.post(`${environment.baseUrl}author`, author)
      .pipe(
        map((res: Author) => res)
      );
  }

  deleteAuthor(id: number) {
    return this.http.delete(`${environment.baseUrl}author/${id}`)
      .pipe(
        map((res: any) => res)
      );
  }

}
