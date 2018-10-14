import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { relacionCamisaPantalon, tallaPlayera } from '../models';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class relacionPantalonC {
    constructor(private http: HttpClient) { }

    //*****Produccion*****/
    baseUrl ="../../api";
    
    //*****Desarrollo*****/
    // baseUrl ="/api";
    relacionPC : relacionCamisaPantalon;
    tallaPlayera : tallaPlayera;
    getRelPantCam() {        
        return this.http.get<relacionCamisaPantalon[]>(`${this.baseUrl}/relacionPantalonCamisa.back.php`, httpOptions)
        .pipe(map(
            relacionPC => {    
                 return relacionPC;
            }),
            catchError(this.handleError));            
    }

    gettallasPlayeras() {        
        return this.http.get<tallaPlayera[]>(`${this.baseUrl}/tallasplayera.back.php`, httpOptions)
        .pipe(map(
            tallaPlayera => {    
                 return tallaPlayera;
            }),
            catchError(this.handleError));            
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError(error);
      }
}