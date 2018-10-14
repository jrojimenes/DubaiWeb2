import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';
import { pedidoGuardado } from '../models';

@Injectable()
export class existenciaPedidoCliente {
    constructor(private http: HttpClient) { }
    
    //*****Produccion*****/
    baseUrl ="../../api";
    
    //*****Desarrollo*****/
    //  baseUrl ="/api";
respuesta: any;
_objPedido : pedidoGuardado[];

    consultaPedido(params: datosUsrPedido) {
        return this.http.post<any>(`${this.baseUrl}/verificaPedido_cliente.back.php`,  params )
        .pipe(map(respuesta => {
             return respuesta;
        }),
            catchError(this.handleError));
    }


    obtenerPedidoUsuario(params: datosPedidoGuardado) {
        return this.http.post<pedidoGuardado[]>(`${this.baseUrl}/obtenerPedidoEmpleado.back.php`,  params )
        .pipe(map(_objPedido => {
             return _objPedido;
        }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError(error);
      }
}

export interface datosUsrPedido {
    fiIdEmpleado     ?: number,
    fiIdEmpresa      ?: number
  }

  export interface datosPedidoGuardado {
    fiIdEmpleado          ?: number,
    fiIdTipoEmpleado      ?: number
  }
