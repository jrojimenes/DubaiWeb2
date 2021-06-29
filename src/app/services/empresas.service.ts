import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { map,catchError} from 'rxjs/operators';
import { Empresas } from '../models';
import { throwError } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmpresasService {
    constructor(private http: HttpClient) { }

    //*****Produccion*****/
    //baseUrl ="../../api";
    
    //*****Desarrollo*****/
     baseUrl ="/api";

empresas : Empresas;
    getEmpresas() {
        return this.http.get<Empresas[]>(`${this.baseUrl}/empresas.back.php`, httpOptions)
        .pipe(map(
            empresas => { 
                localStorage.setItem('EmpresasActuales', JSON.stringify(empresas));   
                 return empresas;
            }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError(error);
      }    
}