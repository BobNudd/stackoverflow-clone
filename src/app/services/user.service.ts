import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from "../../model/User";

@Injectable()
export class UserService {
  private postImgUrlString = 'http://localhost:3000/updateImgUrl';

  constructor(private http: Http) { }

  postImgUrl(imgUrl: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    /* TODO: callat kao metodu iz nekog servisa */
    var localStorageJSON = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorageJSON != null) {
      var localStorageJSON = JSON.parse(localStorage.getItem('currentUser'));
      headers.append('Authorization', 'Bearer ' + localStorageJSON.token);
      console.log('TU je' + localStorageJSON.token);
    }

    let body = {"imgUrl" : imgUrl, "username" : JSON.parse(localStorage.getItem('user')).username};
    console.log(body);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postImgUrlString, body, options)
      .map((res: Response) => res.json());
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
