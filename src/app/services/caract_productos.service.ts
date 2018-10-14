import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { map,catchError} from 'rxjs/operators';
import { CaractProductos } from '../models';
import { throwError } from 'rxjs';
import { pipe } from '@angular/core/src/render3/pipe';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class Caract_Productos {
    constructor(private http: HttpClient) { }

    //*****Produccion*****/
    baseUrl ="../../api";
    
    //*****Desarrollo*****/
    // baseUrl ="/api";

    caract : CaractProductos;

    getCaracteristicas(idEmpresa: number) {
        return this.http.post<CaractProductos[]>(`${this.baseUrl}/obtienecaractProducto.back.php`, { idEmpresa: idEmpresa})
        .pipe(map(caract => {
                 return caract;
            }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError(error);
      }
}
