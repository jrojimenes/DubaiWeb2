import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { SharedService } from '../../../home-module-tallas/shared-service';
import { User } from '../../../models';
import { CustomValidators } from 'ng2-validation';
import { first, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {datosUsuarioUpdateService, ParametrosUpdate, AuthenticationService} from '../../../services'

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss']
})
export class PageFormLayoutComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Bienvenido';
  currentUser : User = JSON.parse(localStorage.getItem('currentUser'))[0];
  tipo_front: number;
  mensaje_front: string;
  currentEmployeId : number = JSON.parse(localStorage.getItem('currentEmployeId'));
  public ActualizaDatosUsuario: FormGroup;
  constructor( private _sharedService: SharedService,
               private fb: FormBuilder,
               public dialog: MatDialog,
               public updateService : datosUsuarioUpdateService,
               public _usrUpdate : AuthenticationService
              )
               {
                this._sharedService.emitChange(this.pageTitle);
               }

  ngOnInit() {
    
     this._usrUpdate.actualizaDartosUsr(this.currentEmployeId.toString(), this.currentUser.finumeroEmpleado.toString())
     .pipe(first()).subscribe(respuesta =>{
      this.currentUser = respuesta[0];
     },
     error =>{

     });

    this.ActualizaDatosUsuario = this.fb.group({
      fctelefono: [null, Validators.compose([Validators.required, CustomValidators.number, Validators.minLength(10), Validators.maxLength(10)])],
       fcEmail: [null, Validators.compose([Validators.required, CustomValidators.email])]
    });
    setTimeout(() => {this.mensajeAviso()},2000);
  }

  get f() { return this.ActualizaDatosUsuario.controls; }

  actualizaDatos(){
    
    const dialogSpinner = this.dialog.open(SpinnerDialog, {
      width: '550px'
    });

    let params: ParametrosUpdate = {
      idEmpleado: this.currentUser.finumeroEmpleado,
      idEmpresa:  this.currentEmployeId,
      correo:     this.f.fcEmail.value,
      telefono:   this.f.fctelefono.value
    };
    this.updateService.actualizaDatos(params)
    .pipe(first())
    .subscribe(
        respuesta => {
          dialogSpinner.close();    
          this.mensaje_front = "Sus datos fueron actualizados con éxito!"
          this.tipo_front = 3;
          const dialogRef = this.dialog.open(RegistraInfoUsuariosDialog, {
            width: '550px',
            data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
          });
          
          this.currentUser.fcmail = params.correo;
          this.currentUser.fctelefono = params.telefono;

        },
        error => {
          this.mensaje_front = error
          this.tipo_front = 1;
          const dialogRef = this.dialog.open(RegistraInfoUsuariosDialog, {
            width: '550px',
            data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
          });
        });
  }

   ngOnDestroy(){
     this._usrUpdate.actualizaDartosUsr(this.currentEmployeId.toString(), this.currentUser.finumeroEmpleado.toString())
   }
  mensajeAviso(){
  if(this.currentUser.fcmail == null || this.currentUser.fctelefono == null || this.currentUser.fcmail == '' || this.currentUser.fctelefono == '' )
    {
      this.mensaje_front = "Para grupo FERSAN es importante la comunicación con sus clientes, por favor ingresa tus datos de contacto como correo electronico y teléfono. Gracias!"
      this.tipo_front = 2;
      const dialogRef = this.dialog.open(RegistraInfoUsuariosDialog, {
        width: '550px',
        data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
      });

    }
  }
}

@Component({
  selector: 'registra-info-dialog',
  templateUrl: 'registra-info-dialog.html',
})
export class RegistraInfoUsuariosDialog{

  constructor(
    public dialogRef: MatDialogRef<RegistraInfoUsuariosDialog>,
    @Inject(MAT_DIALOG_DATA) public data: datosMensajeActualiza) {}

    getColor(tipo: number): string{
      return (tipo == 1) ? 'danger':
             (tipo == 2) ? 'warning' : 'success';
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
export interface datosMensajeActualiza {
  tipo   : number; // 1.- Mensaje error 2.- Mensaje Alerta 3.- Mensaje satisfactorio
  mensaje: string;
}


@Component({
  selector: 'spinner-wait-dialog',
  templateUrl: 'spinner-wait-dialog.html',
})
export class SpinnerDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<SpinnerDialog>) {}
  ngOnInit(){
    
  }
}