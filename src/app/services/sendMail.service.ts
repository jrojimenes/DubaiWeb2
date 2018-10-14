import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';



@Injectable()
export class sendEmail {
  //*****Produccion*****/
  baseUrl ="../../api";
  constructor(private http: HttpClient) {

  }

  enviarMensaje(message: IMessage): Observable<IMessage> | any {
    return this.http.post(`${this.baseUrl}/email.back.php`, message)
    .pipe(map(
          response => {
        return response;
      }), 
      catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    // return an observable with a user friendly message
    return throwError("Error al envíar el mensaje, " + error);
  }
}
export interface IMessage {
    name           ?: string,
    numeroEmpleado ?: number,
    email          ?: string,
    asunto         ?: string,
    telefono       ?: string,
    detalle        ?: string
  }
