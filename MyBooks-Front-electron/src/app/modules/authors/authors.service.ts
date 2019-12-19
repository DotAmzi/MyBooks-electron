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

}
