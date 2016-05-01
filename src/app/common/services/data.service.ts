import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Injectable()
export class DataService {
  constructor(private http: Http) {}

  getCustomers() {
    return this.http.get('/src/customers.json')
      .map((res: Response) => res.json());
  }
}
