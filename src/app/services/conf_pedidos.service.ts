import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { map,catchError} from 'rxjs/operators';
import { configPedidos } from '../models';
import { throwError } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class Conf_Pedidos {
    constructor(private http: HttpClient) { }

    //*****Produccion*****/
    baseUrl ="../../api";
    
    //*****Desarrollo*****/
    // baseUrl ="/api";

    config : configPedidos;

    getConfiguraciones(idEmpresa: number, IdPersonal: number) {
        return this.http.post<configPedidos[]>(`${this.baseUrl}/conf_pedidos.back.php`, { idEmpresa: idEmpresa, IdPersonal: IdPersonal })
        .pipe(map(
            config => {    
                 return config;
            }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError(error);
      }
}