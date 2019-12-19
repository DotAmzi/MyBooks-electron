import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {Book} from '../../shared/interfaces/book';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get(`${environment.baseUrl}book`)
      .pipe(
        map((res: Book[]) => res)
      );
  }

  deleteBooks(id): Observable<string> {
    return this.http.delete(`${environment.baseUrl}book/${id}`)
      .pipe(
        map((res: string) => res)
      );
  }

  saveBook(book: Book) {
    return this.http.post(`${environment.baseUrl}book/`, book)
      .pipe(
        map((res: any) => res)
      );
  }
}
