import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { SharedService } from '../../../home-module-tallas/shared-service';
import {existenciaPedidoCliente, datosUsrPedido, datosPedidoGuardado} from '../../../services';
import { first} from 'rxjs/operators';
import { User, pedidoGuardado } from '../../../models';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  tipo   : number; // 1.- Mensaje error 2.- Mensaje Alerta 3.- Mensaje satisfactorio
  mensaje: string;
}


@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss']
})
export class PageFormElementsComponent implements OnInit {
  pageTitle: string = 'Detalle de mi pedido';
  stateCtrl: FormControl;
  filteredStates: any;
  currentUser : User = JSON.parse(localStorage.getItem('currentUser'))[0];
  currentEmployeId : number = JSON.parse(localStorage.getItem('currentEmployeId'));
  params: datosUsrPedido;
  paramsPed: datosPedidoGuardado;
  pedidoExistente : number;
  _objPedido : pedidoGuardado[];
  mensaje_front: string;
  tipo_front: number;
  comportModal : number;
  _fechaRegistro: Date;
  _estructuraTabla : any[];
  estatusNoAplica : string = 'N/A';
  infoCargda: boolean = false;


  constructor( private _sharedService: SharedService,
               private _consultaPedido : existenciaPedidoCliente,
               public dialog: MatDialog,
             ) {
             this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {

            this.params = {
              fiIdEmpleado : this.currentUser.finumeroEmpleado,
              fiIdEmpresa : this.currentEmployeId
              
           };
            this._consultaPedido.consultaPedido(this.params)
            .pipe(first()).subscribe(
              response =>{
                    this.pedidoExistente = response[0]["existencia_Pedido"];
                    if(this.pedidoExistente == 1 ) 
                    {
                     this.paramsPed = {
                       fiIdEmpleado : this.currentUser.finumeroEmpleado,
                       fiIdTipoEmpleado : this.currentUser.fiIdTipoPersonal
                    };
                    
                    this._consultaPedido.obtenerPedidoUsuario(this.paramsPed)
                    .pipe(first()).subscribe(
                     respuesta =>{
                             this._objPedido = respuesta;
                             this._fechaRegistro = new Date (this._objPedido[0]['fdFechaRegistro']);
                             setTimeout(() => {this.infoCargda = true,5000});
                     },
                     error =>{
                      this.mensaje_front = "Error al consultar el detalle del pedido guardado," + " " + error.toString();
                      this.tipo_front = 1;
                      this.comportModal = 1;
                      const dialogRef = this.dialog.open(respuestaElementDialog, {
                        width: '450px',
                        data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
                      });
                
                     });
                  }
              },
              error =>{
                this.mensaje_front = "Error al verificar existencia de pedidos," + " " + error.toString();
                this.tipo_front = 1;
                this.comportModal = 1;
                const dialogRef = this.dialog.open(respuestaElementDialog, {
                  width: '450px',
                  data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
                });
              });

           };

}


@Component({
  selector: 'respuesta_element_dialog',
  templateUrl: 'respuesta_element_dialog.html',
})
export class respuestaElementDialog {

  constructor(
    public dialogRef: MatDialogRef<respuestaElementDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    getColor(tipo: number): string{
      return (tipo == 1) ? 'danger':
             (tipo == 2) ? 'warning' : 'success';
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}