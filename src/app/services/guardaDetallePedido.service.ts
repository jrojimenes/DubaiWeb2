import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { detallePedido } from '../models';

@Injectable()
export class guardaDetallePedido {
    constructor(private http: HttpClient) { }
    
    //*****Produccion*****/
    //baseUrl ="../../api";
    
    //*****Desarrollo*****/
      baseUrl ="/api";
respuesta: any;
    guardaDetallePedido(params: detallePedido) {
        // console.log("entro detalle");
        return this.http.post<any>(`${this.baseUrl}/guardaDetallePedido.back.php`,  params )
        .pipe(map(respuesta => {
             return respuesta;
        }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError('Surgio un problema al insertar el detalle del pedido!.' + error);
      }
}

  