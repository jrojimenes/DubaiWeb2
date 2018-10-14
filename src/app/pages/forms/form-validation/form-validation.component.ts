import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedService } from '../../../home-module-tallas/shared-service';
import { TallasPantalonService, relacionPantalonC, Conf_Pedidos, AuthenticationService,
         Caract_Productos, relacionCPantalon, guardaCabeceraPedido, guardaDetallePedido,
         existenciaPedidoCliente, datosUsrPedido  } from '../../../services';
import {tallasPantalon, configPedidos, User, CaractProductos, relacionCuelloPantalon,
        cabecerroPedido, detallePedido} from '../../../models'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { first } from 'rxjs/operators';



export interface DialogData {
  tipo   : number; // 1.- Mensaje error 2.- Mensaje Alerta 3.- Mensaje satisfactorio
  mensaje: string;
}

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class PageFormValidationComponent implements OnInit, AfterViewInit {
  //local variables
  pageTitle: string = 'Registro de Tallas';
  public form: FormGroup;
  public tallaPantalon : tallasPantalon[];
  public rel_pantC : any[];
  public conf_PedidosVariable: configPedidos[];
  public rel_CuelloPant: relacionCuelloPantalon[];
  selectedOption: string;
  tipo_front: number;
  params: datosUsrPedido;
  mensaje_front: string;
  stateCtrl: FormControl;
  placeholder_txtpantaloncm = 'Ingresa las medidas';
  placeholder_txtplayeracamisa : string;
  titulo_txtcamisaplayera : string;
  filteredStates: any;
  habilitaCamisas: boolean = false;
  currentUser : User;
  currentEmployeId : number = JSON.parse(localStorage.getItem('currentEmployeId'));
  det_productosFiltrados : CaractProductos[];
  talla_pantalonfiltrado : any[];
  public det_productos : CaractProductos[];
  objcabeceroPedido : cabecerroPedido;
  objdetallePedido  : detallePedido;
  public tallaCamisaGbl : number;
  pedidoExistente : number;
//

largo_manga = [
{
  "fiLargoMangaNumero" : 3,
  "fcPulgadasLargoManga" : "33''"
},
{
  "fiLargoMangaNumero" : 5,
  "fcPulgadasLargoManga" : "35''"
},
{
  "fiLargoMangaNumero" : 7,
  "fcPulgadasLargoManga" : "37''"
}
];

  constructor( private fb: FormBuilder,
               private _sharedService: SharedService,
               private tallasPantalonServ : TallasPantalonService,
               private relpantalonCService : relacionPantalonC,
               public dialog: MatDialog,
               public _confPedido:Conf_Pedidos,
               public _refreshhUser : AuthenticationService,
               public _getCaractProd : Caract_Productos,
               public _getrelcuelloPant : relacionCPantalon,
               public _guardaCabeceraPed : guardaCabeceraPedido,
               public _guardaDetallePed : guardaDetallePedido,
               private _consultaPedido : existenciaPedidoCliente
              ) {

                this.stateCtrl = new FormControl();

                this.filteredStates = this.stateCtrl.valueChanges
                .startWith(null)
                .map(name => this.filterStates(name));


                this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))[0];
     if(this.currentUser.fiIdTipoPersonal == 1){
       this.titulo_txtcamisaplayera = 'Talla de camisa (pulgadas / talla comercial)';
       this.placeholder_txtplayeracamisa = 'Tallas de camisa';
     }
     else if(this.currentUser.fiIdTipoPersonal == 2){
      this.titulo_txtcamisaplayera = 'Talla de playera (talla comercial)';
      this.placeholder_txtplayeracamisa = 'Tallas de playera';
     }
     //Validamos la existencia de pedidos guardados para el cliente
     this.params = {
      fiIdEmpleado : this.currentUser.finumeroEmpleado,
      fiIdEmpresa : this.currentEmployeId
      
   };
    this._consultaPedido.consultaPedido(this.params)
    .pipe(first()).subscribe(
      response =>{
            this.pedidoExistente = response[0]["existencia_Pedido"];
          },
          error =>{
            this.mensaje_front = "Error al verificar existencia de pedidos," + " " + error.toString();
            this.tipo_front = 1;
            this.tipo_front = 1;
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '450px',
          data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
            });
          });


    //Obtiene las tallas de pantalon
    this.tallasPantalonServ.getTallasPantalon()
    .pipe(first()).subscribe(respuesta =>{
       this.tallaPantalon = respuesta;
      },
      error =>{

        this.mensaje_front = "Error al consultar la configuración tallas- pantalon" + error.toString();
        this.tipo_front = 1;
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '450px',
          data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
        });

      });

    //Obtiene la relacion entre la talla de pantalon y camisa
    if(this.currentUser.fiIdTipoPersonal == 1){
    this.relpantalonCService.getRelPantCam()
    .pipe(first()).subscribe(respuesta =>{
      this.rel_pantC = respuesta;
      },
      error =>{

        this.mensaje_front = "Error al consultar la configuración Pantalón - camisa" + error.toString();
        this.tipo_front = 1;
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '450px',
          data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
        });

      });
    }else if(this.currentUser.fiIdTipoPersonal == 2){
      this.relpantalonCService.gettallasPlayeras()
    .pipe(first()).subscribe(respuesta =>{
      this.rel_pantC = respuesta;
      },
      error =>{

        this.mensaje_front = "Error al consultar la configuración playeras  " + error.toString();
        this.tipo_front = 1;
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '450px',
          data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
        });

      });
    }

 //Obtiene las configuraciones de pedido asignado al usuario
    this._confPedido.getConfiguraciones(this.currentEmployeId, +this.currentUser.finumeroEmpleado)
    .pipe(first()).subscribe(respuesta =>{
           this.conf_PedidosVariable = respuesta;
    },
      error =>{

        this.mensaje_front = "Error al consultar la configuración del pedido" + error.toString();
        this.tipo_front = 1;
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '450px',
          data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
        });

      });
    //Obtiene las caracteristicas configuradas de un producto
    this._getCaractProd.getCaracteristicas(this.currentEmployeId)
    .pipe(first()).subscribe(
       respuesta => {
             this.det_productos = respuesta;
       },
       error =>{

      this.mensaje_front = "Error al consultar la configuración del detalle de productos" + error.toString();
      this.tipo_front = 1;
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '450px',
        data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
      });
       });

      //Obtiene las caracteristicas configuradas de un producto
    this._getrelcuelloPant.getRelCuelloPant()
    .pipe(first()).subscribe(
       respuesta => {
             this.rel_CuelloPant = respuesta;
       },
       error =>{

      this.mensaje_front = "Error al consultar la configuración cuello -pantalon" + error.toString();
      this.tipo_front = 1;
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '450px',
        data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
      });
       });




    this.form = this.fb.group({
      ftallaPantaloncm : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(6)])],
      fctallaPantalon: [null, Validators.compose([Validators.required])],
      fclargoMangas: [null, Validators.compose([Validators.required])],
      fctallaCamisa: [null, Validators.compose([Validators.required])],
      creditCard: [null, Validators.compose([Validators.required])],
    });

  }

  get f() { return this.form.controls; }


  ngAfterViewInit(){

  }

  filterStates(val: string ) {
    return val ? this.rel_pantC.filter((s) => new RegExp(val, 'gi').test(s.fntallacamisa.toString())) : this.rel_pantC;
  }

  onSelectTallaCamisa(valor, tallaComercial){

    if(this.currentUser.fiIdTipoPersonal == 1){
    if(this.f.ftallaPantaloncm.value == null){
      this.f.ftallaPantaloncm.disable();
      this.placeholder_txtpantaloncm = 'Opción deshabilitada';
      this.talla_pantalonfiltrado = this.rel_CuelloPant
                                  .filter(function(item){
                                  return item.fcTallaCamisa == valor;
                                  });
        }
          this.form.patchValue({
            fctallaCamisa : tallaComercial
          });
         this.tallaCamisaGbl = tallaComercial;
      }
      else if(this.currentUser.fiIdTipoPersonal == 2){
        this.form.patchValue({
          fctallaCamisa : tallaComercial
         });
         this.tallaCamisaGbl = tallaComercial;
         
         this.form.patchValue({
          fclargoMangas :'completo',
          creditCard : 'completo'
         });
      }
  }

  formReset(valor: number){
    this.form.reset();
    this.talla_pantalonfiltrado = null;
    this.f.ftallaPantaloncm.enable();
    this.placeholder_txtpantaloncm = 'Ingresa las medidas';
    this.stateCtrl.reset();
    this.form.patchValue({
      fctallaCamisa : null
     });
     if(valor == 1){location.reload()};
  }

  validaTallaPantalon(valor: number){
    var numeroTalla = 0;
    var tallaComercial : any;

    if(!this.form.controls['ftallaPantaloncm'].hasError('required')){
      if(this.currentUser.fiIdTipoPersonal == 1){
       tallaComercial = 
        
        this.tallaPantalon.find(function( item){
        (valor >= 72.5 && valor <= 77.5)  ?  numeroTalla = 28 :
        (valor >= 77.6 && valor <= 82.5)  ?  numeroTalla = 30 :
        (valor >= 82.6 && valor <= 87.5)  ?  numeroTalla = 32 :
        (valor >= 87.6 && valor <= 92.5)  ?  numeroTalla = 34 :
        (valor >= 92.6 && valor <= 97.5)  ?  numeroTalla = 36 :
        (valor >= 97.6 && valor <= 102.5) ?  numeroTalla = 38 :
        (valor >= 103.1 && valor <= 108)  ?  numeroTalla = 40 :
        (valor >= 108.1 && valor <= 113)  ?  numeroTalla = 42 :
        (valor >= 113.1 && valor <= 118)  ?  numeroTalla = 44 :
        (valor >= 118.1 && valor <= 123.5) ?  numeroTalla = 46 :
        (valor >= 123.6 && valor <= 128.5) ?  numeroTalla = 48 :
        (valor >= 128.6 && valor <= 133.5) ?  numeroTalla = 50 : 0
        ;
        return item.fntallaPantalon == numeroTalla;
      });
    }
    else if (this.currentUser.fiIdTipoPersonal == 2){
          tallaComercial = 
        
        this.tallaPantalon.find(function( item){
        (valor >= 69.90  && valor <= 74.80)  ?  numeroTalla = 28 :
        (valor >= 74.81  && valor <= 79.90)  ?  numeroTalla = 30 :
        (valor >= 79.91  && valor <= 85.00)  ?  numeroTalla = 32 :
        (valor >= 85.1   && valor <= 90.00)  ?  numeroTalla = 34 :
        (valor >= 90.1   && valor <= 95.10)  ?  numeroTalla = 36 :
        (valor >= 95.11  && valor <= 100.20) ?  numeroTalla = 38 :
        (valor >= 100.21 && valor <= 105.30) ?  numeroTalla = 40 :
        (valor >= 105.31 && valor <= 110.40) ?  numeroTalla = 42 :
        (valor >= 110.41 && valor <= 115.50) ?  numeroTalla = 44 :
        (valor >= 115.51 && valor <= 120.60) ?  numeroTalla = 46 :
        (valor >= 120.61 && valor <= 125.70) ?  numeroTalla = 48 :
        (valor >= 125.71 && valor <= 130.80) ?  numeroTalla = 50 : 0
        ;
        return item.fntallaPantalon == numeroTalla;
      });
    }

      if(tallaComercial != null){

      this.talla_pantalonfiltrado = this.tallaPantalon
                                    .filter(function(item){
                                    return item.fntallaPantalon == tallaComercial.fntallaPantalon;
                                    });
      if(this.currentUser.fiIdTipoPersonal == 1){
        
        this.form.patchValue({
          ftallaPantaloncm : valor.toString()
        });

      this.rel_pantC = this.rel_pantC
                        .filter(function(item){
                        return item.fntallapantalon == tallaComercial.fntallaPantalon;
                        });
                      }
    }
    else{
      this.mensaje_front = "No se encontraron resultados con los valores ingresados, verifique su información"
      this.tipo_front = 2;
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '450px',
        data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
      });
       }
    }
  }

  showVideoHelp():void{
    const dialog = this.dialog.open(MuestraVideoAyuda, {
      width: '750px'
    });

    dialog.afterClosed().subscribe(result => {
      this.mensaje_front = result;
    });
  }

  onSelect(event, idConfiguracion: number){
   var numeroCaract = null;
    if(event != undefined){
    this.conf_PedidosVariable
    .forEach(function(item){
      if(item.fiIdDetallePaquetes == idConfiguracion){
        item.fiIdCraracteristica = event["fiIdCaract"];
      }
      if(item.fiIdProducto == 1 || item.fiIdProducto == 2){
        item.fiIdCraracteristica = 4;
      }
    });

    numeroCaract = this.conf_PedidosVariable
                   .filter(function(e){
                   return e.fiIdCraracteristica.toString().length == 0;
                   });

    if(numeroCaract.length == 0){
      this.form.patchValue({
        fctallaCamisa : this.tallaCamisaGbl
      });
      // this.f.ftallaPantaloncm.disable();
    }
    else{
      this.form.patchValue({
        fctallaCamisa : null
      });
    }
  }
  // console.log(this.f.ftallaPantaloncm.value, this.f.fctallaPantalon.value, this.f.fclargoMangas.value, this.f.fctallaCamisa.value, this.f.creditCard.value);
  }

  filtra(fiIdProducto : number, fiIdDetallePaquetes: number): void{
    this.det_productosFiltrados = this.det_productos.filter(datos => datos.fiIdProducto == fiIdProducto && datos.fiIdDetallePaquetes == fiIdDetallePaquetes);
  }

  verificaVisibilidad(fiIdProducto: number):boolean{
    // console.log("Entra a al funcion hide");
    var resultado = false;
     if(fiIdProducto !=1 && fiIdProducto != 2){
              resultado = true;
     }
     return resultado;
  }

  guardarPedido(){
    const dialogSpinner = this.dialog.open(SpinnerGuardaPedDialog, {
      width: '550px'
    });
    this.objcabeceroPedido = new cabecerroPedido();
    this.objdetallePedido = new detallePedido();

    //Agregamos identificadores para el cabecero del pedido
    this.objcabeceroPedido.fiIdEmpleado    = +this.currentUser.finumeroEmpleado;
    this.objcabeceroPedido.fiIdEmpresa     = this.currentEmployeId;
    //Agregamos identificadores para el detalle del pedido
    this.objdetallePedido.fiIdEmpleado = +this.currentUser.finumeroEmpleado;
    this.objdetallePedido.fiIdEmpresa  = this.currentEmployeId;

    if(this.currentUser.fiIdTipoPersonal == 1){
    //Cabecero del pedido
    this.objcabeceroPedido.fiTallaPantalon = +this.f.fctallaPantalon.value;
    this.objcabeceroPedido.fiTallaCamisa   = +this.f.fctallaCamisa.value;
    this.objcabeceroPedido.fiLargoManga    = +this.f.fclargoMangas.value;
    this.objcabeceroPedido.fcTallaPlayera  = null;
    //Detalle del pedido
    var opc1, opc2, opc3, opc4, opc5;
    this.conf_PedidosVariable
    .forEach(function(e){

       if(e.fiIdDetallePaquetes == 1){opc1  = e.fiIdCraracteristica}
       if(e.fiIdDetallePaquetes == 2){opc2  = e.fiIdCraracteristica};
       if(e.fiIdDetallePaquetes == 3){opc3  = e.fiIdCraracteristica};
       if(e.fiIdDetallePaquetes == 4){opc4  = e.fiIdCraracteristica};
       if(e.fiIdDetallePaquetes == 5){opc5  = e.fiIdCraracteristica};
    });

       this.objdetallePedido.fidetallePantalon1  = +opc1;
       this.objdetallePedido.fidetallePantalon2  = +opc2;
       this.objdetallePedido.fidetalleCamisaVino = +opc3;
       this.objdetallePedido.fidetalleCamisaGris = +opc4;
       this.objdetallePedido.fiDetalleCamisaAzul = +opc5;

  }else if(this.currentUser.fiIdTipoPersonal == 2){
    //Cabecero del pedido
    this.objcabeceroPedido.fiTallaPantalon  = +this.f.fctallaPantalon.value;
    this.objcabeceroPedido.fcTallaPlayera   = this.f.fctallaCamisa.value;
    this.objcabeceroPedido.fiLargoManga     = 0;
    this.objcabeceroPedido.fiTallaCamisa    = 0;
  }

  this._guardaCabeceraPed.guardaPedido(this.objcabeceroPedido)
                        .pipe(first()).subscribe(respuesta =>{

                          if(this.currentUser.fiIdTipoPersonal == 1){
                            this.objdetallePedido.fiIdetallePed = +respuesta[0]['lastId'];
                            this._guardaDetallePed.guardaDetallePedido(this.objdetallePedido)
                            .pipe(first()).subscribe(respuesta =>{
                              dialogSpinner.close();
                              this.mostrarMensajeGuardadoSatisfac();
                              setTimeout(() => {this.mostrarMensajeAviso(),5000});
                             },
                             error =>{
                              dialogSpinner.close();
                               this.mensaje_front = "Error al guardar el detalle del pedido" + error.toString();
                               this.tipo_front = 1;
                               const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                                 width: '450px',
                                 data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
                               });
                             });
                          }
                          else{
                            dialogSpinner.close();
                            this.mostrarMensajeGuardadoSatisfac();
                            setTimeout(() => {this.mostrarMensajeAviso(),5000});
                          }

                          },
                          error =>{
                            dialogSpinner.close();
                            this.mensaje_front = "Error al guardar el cabecero del pedido" + error.toString();
                            this.tipo_front = 1;
                            const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                              width: '450px',
                              data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
                            });
                          });
                          this.formReset(0);
  }

  mostrarMensajeAviso(){
    this.mensaje_front = `Una vez recibidos los uniformes se contara con 5 días 
                                                  naturales para reportar cualquier talla que haya llegado errónea,
                                                  una vez pasado este tiempo no existirán cambios.`;
                              this.tipo_front = 1;
                              const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                                width: '450px',
                                data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
                              });
  }

  mostrarMensajeGuardadoSatisfac(){
    this.mensaje_front = `¡Su pedido se guardo satisfactoriamente!.`;
    this.tipo_front = 3;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data: {mensaje: this.mensaje_front, tipo: this.tipo_front}
    });
  }
}

@Component({
  selector: 'muestra_video_dialog',
  templateUrl: 'video_ayuda_dialog.html',
})
export class MuestraVideoAyuda {
  constructor(
    public dialog: MatDialogRef<MuestraVideoAyuda>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialog.close();
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    getColor(tipo: number): string{
      return (tipo == 1) ? 'danger':
             (tipo == 2) ? 'warning' : 'success';
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'spinner-load-dialog',
  templateUrl: 'spinner-load-dialog.html',
})
export class SpinnerGuardaPedDialog{
  constructor(public dialogRef: MatDialogRef<SpinnerGuardaPedDialog>) {}
}