import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';
import { cabecerroPedido } from '../models';

@Injectable()
export class guardaCabeceraPedido {
    constructor(private http: HttpClient) { }
    
    //*****Produccion*****/
    //baseUrl ="../../api";
    
    //*****Desarrollo*****/
      baseUrl ="/api";
respuesta: any;
    guardaPedido(params: cabecerroPedido) {
        return this.http.post<any>(`${this.baseUrl}/guardaCabeceroPedido.back.php`,  params )
        .pipe(map(respuesta => {
             return respuesta;
        }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError('Surgio un problema al insertar el cabecero del pedido!.' + error);
      }
}

  