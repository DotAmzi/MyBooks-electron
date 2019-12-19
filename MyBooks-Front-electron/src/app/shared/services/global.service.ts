import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Author} from '../interfaces/author';
import {map} from 'rxjs/operators';
import {Publishers} from '../interfaces/publishers';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAuthors() {
    return this.http.get(`${environment.baseUrl}author`)
      .pipe(
        map((res: Author[]) => res)
      );
  }

  getPublishers() {
    return this.http.get(`${environment.baseUrl}publisher`)
      .pipe(
        map((res: Publishers[]) => res)
      );
  }
}
