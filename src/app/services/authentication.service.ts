import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../models';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    user : User;
    
    //*****Produccion*****/
    baseUrl ="../../api";
    
    //*****Desarrollo*****/
    // baseUrl ="/api";

    
    login(idEmpresa: string, password: string) {
        return this.http.post<User[]>(`${this.baseUrl}/login.back.php`, { idEmpresa: idEmpresa, password: password },httpOptions)
            .pipe(map(user => {
                console.log(user);
                // login successful if there's a jwt token in the response
                if (user.length > 0) {
                    user[0].fcToken = "fake-jwt-token";
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                 return user;
            }),
            catchError(this.handleError));
    }

    actualizaDartosUsr(idEmpresa: string, password: string) {
        
        return this.http.post<User>(`${this.baseUrl}/login.back.php`, { idEmpresa: idEmpresa, password: password })
            .pipe(map(user => {
                 return user;
            }),
            catchError(this.handleError));
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('rel_pant_cam');
        localStorage.removeItem('tallas_Pantalon');
        localStorage.removeItem('config_pedidos');
        localStorage.removeItem('currentUser');

    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError('Usuario no encontrado!.');
      }
}