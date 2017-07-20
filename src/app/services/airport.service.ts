import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/*
* This services makes the calls to the server to get the results
*/
@Injectable()
export class AirportService {

  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  getAirport(name, byCode): Observable<any> {
  	
  	if (byCode) {
  		return this.http.get(`/api/airports/code/${name}`).map(res => res.json());
  	} else {
  		return this.http.get(`/api/airports/name/${name}`).map(res => res.json());
  	}
    
  }

}
