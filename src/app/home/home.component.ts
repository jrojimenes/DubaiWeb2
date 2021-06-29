import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { AlertService, AuthenticationService, EmpresasService, sendEmail, IMessage } from '../services';
import {Empresas} from '../models'
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Location } from '@angular/common';
import { CustomValidators } from 'ng2-validation';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    tipo   : number; // 1.- Mensaje error 2.- Mensaje Alerta 3.- Mensaje satisfactorio
    mensaje: string;
  }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  loginForm: FormGroup;
  public contactForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  empresas : Empresas[];
  tipo_front: number;
  mensaje_front: string;
  urlFacebook : string = 'https://www.facebook.com/dubaiunif/';
  empresaSeleccionada  = 0;
  currentYear : number = new Date().getFullYear();
  activoEmpresa : number;
  csiCero : number = 0;

  constructor(
              private formBuilder: FormBuilder,
              private fb: FormBuilder,
              private route      : ActivatedRoute,
              private router     : Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private empresasService: EmpresasService,
              location : Location,
              private _senMail : sendEmail,
              public dialog: MatDialog
             ) { 

             }
            
             ngOnInit() {
                  //Formulario login
                  this.loginForm = this.formBuilder.group({
                  username : ['', Validators.required],
                  password: ['', Validators.required],
                

              });
                // reset login status
                this.authenticationService.logout();

                // get return url from route parameters or default to 'home_tallas'
                this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home_tallas/form-validation';

                //Formulario mail
                this.contactForm = this.fb.group({
                    fcnombre:   [null, Validators.required],
                    fcEmail:    [null, Validators.compose([Validators.required, CustomValidators.email])],
                    fcAsunto:   [null, Validators.required],
                    fccomments: [null, Validators.required],
                });
            }
            ngAfterViewInit(){
            }

       // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    get c() { return this.contactForm.controls;}

    onSubmit() {        
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        else if(this.validaAccesos()){
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.setItem('currentEmployeId', this.f.username.value); 
                    this.router.navigateByUrl(this.returnUrl); //-> url a la que quieres navegar
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
            }
     }

     validaAccesos() : boolean {
        var currentIdEmpres =this.f.username.value;
        var response = true;
       var status = this.empresas.filter(function(item){return item.fiIdEmpresa == currentIdEmpres});
       
           if(+status[0]['fiestatusEmpresa']  == this.csiCero) 
           {
               response = false;
               this.alertService.error("Servicio no disponible, contacte al administrador");
               return;
           }
           return response;
     }

     onSendMail(){  
        this.submitted = true;
        // stop here if form is invalid
        if (this.contactForm.invalid) {
            return;
        }

        let message : IMessage = {
            name :   this.c.fcnombre.value,
            numeroEmpleado: 0,
            email:   this.c.fcEmail.value,
            asunto:  this.c.fcAsunto.value,
            telefono: "N/A",
            detalle: this.c.fccomments.value
        };

        this._senMail.enviarMensaje(message)
        .pipe(first()).subscribe(respuesta =>{
            this.contactForm.reset();
            // this.mensaje_front = `Recibimos su mensaje satisfactoriamente, gracias!`;
            //                   this.tipo_front = 3;
            //                   const dialogRef = this.dialog.open(infoMailDialog, {
            //                     width: '450px',
            //                     data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
            //                   });
            this.alertService.success(respuesta);
            this.loading = true;
          },
          error =>{
            // this.mensaje_front = `Ocurrio un problema al enviar su mensaje, intenete mas tarde...`;
            // this.tipo_front = 1;
            // const dialogRef = this.dialog.open(infoMailDialog, {
            //   width: '450px',
            //   data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
            // });
            this.contactForm.reset();
            this.alertService.success("Mensaje Enviado");
            location.reload();
          });
    }
     ConsultaEmpresas() : void{
        this.empresasService.getEmpresas()
        .pipe(first()).subscribe(respuesta =>{
             this.empresas = respuesta;
           },
           error =>{
                 
           });
     }

     ngOnDestroy(){
          location.reload();
     }

     redirecFacebook(){
         window.open(this.urlFacebook, "_blank");
     }
    
  }

  @Component({
    selector: 'info-dialog', 
    templateUrl: 'info-dialog.html',
  })
  export class infoMailDialog {
  
    constructor(
      public dialogRef: MatDialogRef<infoMailDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
      getColor(tipo: number): string{
        return (tipo == 1) ? 'danger':
               (tipo == 2) ? 'warning' : 'success';
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
