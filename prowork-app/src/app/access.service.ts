import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "./model/user";

@Injectable()
export class AccessService {

  constructor(private http: HttpClient, private router: Router) {
  }

  register(formData: FormData): Observable<User> {
    const restApiUrl = environment.restApiUrl + environment.accessController.url + environment.accessController.register;
    return this.http.post<User>(restApiUrl, formData);
  }

  login(formData: FormData): Observable<any> {
    const restApiUrl = environment.restApiUrl + environment.accessController.url + environment.accessController.login;
    return this.http.post(restApiUrl, formData, {responseType: 'text'});
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
