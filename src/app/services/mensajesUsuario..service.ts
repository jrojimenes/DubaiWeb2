import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { throwError, Observable} from 'rxjs';


@Injectable()
export class guardaMensajeUsr {
    constructor(private http: HttpClient) { }
    
    //*****Produccion*****/
    baseUrl ="../../api";
    
    //*****Desarrollo*****/
    //  baseUrl ="/api";

    guardaMensajeUsuario(params: ParametrosMensajeUsr) {
        // console.log(params);
        return this.http.post<Observable<any>>(`${this.baseUrl}/guardaMensajesUsuario.back.php`,  params )
        .pipe(map(respuesta => {
             return respuesta;
        }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError('Surgio un problema al registrar el mensaje del usuario!.' + error);
      }
}

export interface ParametrosMensajeUsr {
    fiidEmpleado: number;
    fcAsuntos: string;
    fcDetalles: string;
  }
  
  