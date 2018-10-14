import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { relacionCuelloPantalon } from '../models';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class relacionCPantalon {
    constructor(private http: HttpClient) { }

    //*****Produccion*****/
    baseUrl ="../../api";
    
    //*****Desarrollo*****/
    // baseUrl ="/api";

    relacionCP : relacionCuelloPantalon;
    getRelCuelloPant() {        
        return this.http.get<relacionCuelloPantalon[]>(`${this.baseUrl}/relacionCuelloPantalon.back.php`, httpOptions)
        .pipe(map(
            relacionCP => {    
                 return relacionCP;
            }),
            catchError(this.handleError));            
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError(error);
      }
}