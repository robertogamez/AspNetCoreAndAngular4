import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AuthHttp } from '../auth/auth.http';
import { Observable } from 'rxjs/Observable';

import { User } from '../user/user';

@Injectable()
export class AuthService {

    authKey: string = "auth";

    constructor(private http: AuthHttp) { }

    login(
        username: string,
        password: string
    ): any {
        var url = 'api/connect/token';

        var data = {
            username: username,
            password: password,
            client_id: "OpenGameList",
            grant_type: "password",
            scope: "offline_access profile email"
        };

        return this.http.post(
            url,
            this.toUrlEncodedString(data),
            new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
        ).map(response => {
            var auth = response.json();

            console.log('The following aut JSON object has been received: ');
            console.log(auth);

            this.setAuth(auth);
            return auth;
        })
    }

    logout(): any {
        return this.http.post('api/accounts/logout', null)
            .map(response => {
                this.setAuth(null)
                return true;
            })
            .catch(err => {
                return Observable.throw(err);
            });
    }

    // Converts a JSON Object to urlencoded format
    toUrlEncodedString(data: any) {
        var body = '';
        for (var key in data) {
            if (body.length) {
                body += '&';
            }
            body += key + '=';
            body += encodeURIComponent(data[key]);
        }

        return body;
    }

    // Persists auth info into localStorage or removes it if a NULL argument is given
    setAuth(auth: any): boolean {
        if (auth) {
            localStorage.setItem(this.authKey, JSON.stringify(auth));
        } else {
            localStorage.removeItem(this.authKey);
        }

        return true;
    }

    // Retrieves the auth JSON object (or NULL if none)
    getAuth(): any {
        var i = localStorage.getItem(this.authKey);
        if (i) {
            return JSON.parse(i);
        } else {
            return null;
        }
    }

    // Returns TRUE if the user is logged in, FALSE otherwise
    isLoggedIn(): boolean {
        return localStorage.getItem(this.authKey) != null;
    }

    get() {
        return this.http.get('/api/accounts')
            .map(response => response.json());
    }

    add(user: User) {
        return this.http.post(
            '/api/accounts',
            JSON.stringify(user),
            new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
        ).map(response => response.json());
    }

    update(user: User) {
        return this.http.put(
            'api/accounts',
            JSON.stringify(user),
            new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
        ).map(response => response.json());
    }

}
