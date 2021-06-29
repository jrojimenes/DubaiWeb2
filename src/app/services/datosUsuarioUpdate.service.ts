import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable()
export class datosUsuarioUpdateService {
    constructor(private http: HttpClient) { }
    
    //*****Produccion*****/
    //baseUrl ="../../api";
    
    //*****Desarrollo*****/
     baseUrl ="/api";

    actualizaDatos(params: ParametrosUpdate) {

        return this.http.post<Observable<any>>(`${this.baseUrl}/actualizaDatosUsr.back.php`,  params )
        .pipe(map(respuesta => {
             return respuesta;
        }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        // return an observable with a user friendly message
        return throwError('Surgio un problema al actualizar los datos!.' + error);
      }
}
export interface ParametrosUpdate {
    correo: string;
    telefono: string;
    idEmpleado: number;
    idEmpresa: number;
  }
  