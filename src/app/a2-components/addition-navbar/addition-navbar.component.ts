import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models';
import {Router} from '@angular/router';
import {AuthenticationService, guardaMensajeUsr, ParametrosMensajeUsr, sendEmail, IMessage} from '../../services';
import { first } from 'rxjs/operators';

export interface DialogData {
  fiIdEmpresa   : number; 
  fiIdEmpleado  : number;
}

@Component({
  selector: 'addition-navbar',
  templateUrl: './addition-navbar.component.html',
  styleUrls: ['./addition-navbar.component.scss'],
  host: {
    '[class.addition-navbar]': 'true',
    '[class.open]': 'open'
  }
})
export class AdditionNavbarComponent implements OnInit {
  title: string;
  open: boolean;
  oldUser: User;
  currentEmployeId : number = JSON.parse(localStorage.getItem('currentEmployeId'));
  public form: FormGroup;
  constructor(public dialog: MatDialog) {
    this.title = 'Sección de ayuda';
    this.open = false;
  }

   openNavbar() {
    this.open = !this.open;
  }

  ngOnInit() { 
    this.oldUser = JSON.parse(localStorage.getItem('currentUser'))[0];
  }

  formularioContacto(){
    const dialog = this.dialog.open(FormContactoDialog, {
      width: '750px',
      data: {fiIdEmpresa: this.currentEmployeId, fiIdEmpleado: this.oldUser.finumeroEmpleado}
    });
  }
}

@Component({
  selector: 'contactoForm-dialog',
  templateUrl: 'contactoForm-dialog.html',
})
export class FormContactoDialog implements OnInit {
  public form: FormGroup;
  currentUser: User;
  mensaje_front : string;
  tipo_front : number;
  constructor(
    public dialogRef: MatDialogRef<FormContactoDialog>,
    private fb: FormBuilder,
    public _usrservice : AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router     : Router,
    private _enviarMsj : guardaMensajeUsr,
    private _senMail : sendEmail,
    public dialog: MatDialog,
     ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
      
    this._usrservice.actualizaDartosUsr(this.data.fiIdEmpresa.toString(), this.data.fiIdEmpleado.toString())
    .pipe(first()).subscribe(respuesta =>{
      this.currentUser = respuesta[0];
     },
     error =>{

     });
    
    this.form = this.fb.group({
      fcAsunto : [null, Validators.compose([Validators.required])],
      fcDetalle: [null, Validators.compose([Validators.required])]
    });
  }
  EnviarMensaje(){
    
  if(this.currentUser.fctelefono != null && this.currentUser.fcmail != null){
//Enviamos un correo con el mensaje del usuario, al administrador    
let message : IMessage = {
  name :   this.currentUser.fcnombrePersonal +' '+this.currentUser.fcapellidoPaterno +' '+this.currentUser.fcapellidoMaterno,
  numeroEmpleado: this.currentUser.finumeroEmpleado,
  email:   this.currentUser.fcmail,
  telefono: this.currentUser.fctelefono,
  asunto:  this.f.fcAsunto.value,
  detalle: this.f.fcDetalle.value
};
 this._senMail.enviarMensaje(message)
 .pipe(first()).subscribe(respuesta =>{
  
  // this.mensaje_front = `Recibimos su mensaje satisfactoriamente, gracias!`;
  //                   this.tipo_front = 3;
  //                   const dialogRef = this.dialog.open(infoMailDialog, {
  //                     width: '450px',
  //                     data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
  //                   });
  
},
error =>{
  // this.mensaje_front = `Ocurrio un problema al enviar su mensaje, intenete mas tarde...`;
  // this.tipo_front = 1;
  // const dialogRef = this.dialog.open(infoMailDialog, {
  //   width: '450px',
  //   data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
  // });
  
});


//Registramos el mensaje del usuario en la base de datos
    let params: ParametrosMensajeUsr = {
      fiidEmpleado : +this.currentUser.finumeroEmpleado,
      fcAsuntos: this.f.fcAsunto.value,
      fcDetalles:  this.f.fcDetalle.value
    };
    
    this._enviarMsj.guardaMensajeUsuario(params)
    .pipe(first()).subscribe(respuesta =>{
      
      this.dialogRef.close();
      this.mensaje_front = "Hemos registrado correctamente su mensaje, en breve nos pondremos en contacto gracias!";
          this.tipo_front = 3;
          const dialogRef = this.dialog.open(RegistraMensajeUsrDialog, {
            width: '550px',
            data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
          });
     },
     error =>{
      this.mensaje_front = "Ocurrio un error al guardar el mensaje"+ error;
      this.tipo_front = 1;
      const dialogRef = this.dialog.open(RegistraMensajeUsrDialog, {
        width: '550px',
        data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
      });
    });
  }
  else{
    this.dialogRef.close();
    this.router.navigateByUrl('/home_tallas/form-layout');
  }
  }
  get f() { return this.form.controls; }

}

@Component({
  selector: 'registramensaje-dialog',
  templateUrl: 'registramensaje-dialog.html',
})
export class RegistraMensajeUsrDialog{

  constructor(
    public dialogRef: MatDialogRef<RegistraMensajeUsrDialog>,
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
