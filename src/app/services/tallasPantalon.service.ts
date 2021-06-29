import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { map,catchError} from 'rxjs/operators';
import { tallasPantalon } from '../models';
import { throwError } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TallasPantalonService {
    constructor(private http: HttpClient) { }

    //*****Produccion*****/
    //baseUrl ="../../api";
    
    //*****Desarrollo*****/
     baseUrl ="/api";

    tallas : tallasPantalon;
    getTallasPantalon() {        
        return this.http.get<tallasPantalon[]>(`${this.baseUrl}/tallasPantalon.back.php`, httpOptions)
        .pipe(map(
            tallas => {    
                 return tallas;
            }),
            catchError(this.handleError));    
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError(error);
      }
}