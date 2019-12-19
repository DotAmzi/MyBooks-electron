import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Publishers} from '../../shared/interfaces/publishers';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  constructor(
    private http: HttpClient
  ) {
  }

}
