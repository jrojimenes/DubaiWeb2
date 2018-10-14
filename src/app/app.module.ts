import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import {AppRoutingModule}         from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import {NgSelectModule} from '@ng-select/ng-select';

// videogular
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';


import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';


import { AppComponent } from './app.component';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { HomeModuleTallasComponent } from './home-module-tallas/home-module-tallas.component';
import { AlertService, AuthenticationService, UserService, EmpresasService, TallasPantalonService, 
         relacionPantalonC ,Conf_Pedidos, datosUsuarioUpdateService, Caract_Productos, relacionCPantalon,
        guardaCabeceraPedido, guardaDetallePedido, guardaMensajeUsr, sendEmail, existenciaPedidoCliente} from './services';
import { AuthGuard } from './guards';
import { HomeComponent, infoMailDialog } from './home/home.component';

import { ChartsModule }                     from 'ng2-charts';
import { CalendarModule }                   from 'angular-calendar';
import { AgmCoreModule }                    from '@agm/core';


//A2 Components
import { NavbarComponent }                  from './a2-components/navbar/navbar.component';
import { SidebarComponent }                 from './a2-components/sidebar/sidebar.component';
import { LogoComponent }                    from './a2-components/logo/logo.component';
import { MainMenuComponent }                from './a2-components/main-menu/main-menu.component';
import { A2CardComponent }                  from './a2-components/card/card.component';
import { AlertComponent }                   from './a2-components/alert/alert.component';
import { AlertComponentFront }              from './directives/alert.component';
import { BadgeComponent }                   from './a2-components/badge/badge.component';
import { BreadcrumbComponent }              from './a2-components/breadcrumb/breadcrumb.component';
import { FileComponent }                    from './a2-components/file/file.component';
import { NIHTimelineComponent }             from './a2-components/ni-h-timeline/ni-h-timeline.component';

//A2 Pages
import { PageDashboardComponent }           from './pages/dashboard/dashboard.component';
import { PageDashboard2Component }          from './pages/dashboard-2/dashboard-2.component';


import { PageFileComponent }                from './pages/a2-components/file/file.component';
import { PageA2CardComponent }              from './pages/a2-components/a2-card/a2-card.component';
import { PageAlertComponent }               from './pages/a2-components/alert/alert.component';
import { PageBadgeComponent }               from './pages/a2-components/badge/badge.component';
import { PageBreadcrumbComponent }          from './pages/a2-components/breadcrumb/breadcrumb.component';

import { PageTypographyComponent }          from './pages/typography/typography.component';
import { PageNotFoundComponent }            from './pages/not-found/not-found.component';


import { PageAboutUsComponent }             from './pages/pages-service/about-us/about-us.component';
import { PageFaqComponent }                 from './pages/pages-service/faq/faq.component';
import { PageTimelineComponent }            from './pages/pages-service/timeline/timeline.component';
import { PageInvoiceComponent }             from './pages/pages-service/invoice/invoice.component';
import { PageLineChartComponent }           from './pages/charts/line-chart/line-chart.component';
import { PageBarChartComponent }            from './pages/charts/bar-chart/bar-chart.component';
import { PageDoughnutChartComponent }       from './pages/charts/doughnut-chart/doughnut-chart.component';
import { PageRadarChartComponent }          from './pages/charts/radar-chart/radar-chart.component';
import { PagePieChartComponent }            from './pages/charts/pie-chart/pie-chart.component';
import { PagePolarAreaChartComponent }      from './pages/charts/polar-area-chart/polar-area-chart.component';
import { PageDynamicChartComponent }        from './pages/charts/dynamic-chart/dynamic-chart.component';
import { PageCalendarComponent }            from './pages/calendar/calendar.component';
import { CalendarDialogComponent }          from './pages/calendar/calendar.component';
import { PageSimpleTableComponent }         from './pages/tables/simple-table/simple-table.component';
import { PageBootstrapTablesComponent }     from './pages/tables/bootstrap-tables/bootstrap-tables.component';
import { PageSortingTableComponent }        from './pages/tables/sorting-table/sorting-table.component';
import { PageFilteringTableComponent }      from './pages/tables/filtering-table/filtering-table.component';
import { PagePaginationTableComponent }     from './pages/tables/pagination-table/pagination-table.component';
import { PageFormElementsComponent, respuestaElementDialog }  from './pages/forms/form-elements/form-elements.component';
import { PageFormLayoutComponent, RegistraInfoUsuariosDialog, SpinnerDialog }          from './pages/forms/form-layout/form-layout.component';
import { PageFormValidationComponent, DialogOverviewExampleDialog, MuestraVideoAyuda, SpinnerGuardaPedDialog}      from './pages/forms/form-validation/form-validation.component';
import { PageGoogleMapComponent }           from './pages/maps/google-map/google-map.component';
import { PageLeafletMapComponent }          from './pages/maps/leaflet-map/leaflet-map.component';
import { PageWidgetsComponent }             from './pages/widgets/widgets.component';
import { FooterComponent }                  from './a2-components/footer/footer.component';
import { AdditionNavbarComponent, FormContactoDialog, RegistraMensajeUsrDialog }          from './a2-components/addition-navbar/addition-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeModuleTallasComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    LogoComponent,
    MainMenuComponent,
    A2CardComponent,
    AlertComponentFront,
    BadgeComponent,
    BreadcrumbComponent,
    FileComponent,
    NIHTimelineComponent,
    AdditionNavbarComponent,
    FormContactoDialog,
    RegistraMensajeUsrDialog,
    infoMailDialog,
    respuestaElementDialog,
    PageDashboardComponent,
    PageDashboard2Component,
    

    PageFileComponent,
    PageA2CardComponent,
    PageAlertComponent,
    PageBadgeComponent,
    PageBreadcrumbComponent,

    PageTypographyComponent,
    PageNotFoundComponent,

    PageAboutUsComponent,
    PageFaqComponent,
    PageTimelineComponent,
    PageInvoiceComponent,
    PageLineChartComponent,
    PageBarChartComponent,
    PageDoughnutChartComponent,
    PageRadarChartComponent,
    PagePieChartComponent,
    PagePolarAreaChartComponent,
    PageDynamicChartComponent,
    PageCalendarComponent,
    CalendarDialogComponent,
    PageSimpleTableComponent,
    PageBootstrapTablesComponent,
    PageSortingTableComponent,
    PageFilteringTableComponent,
    PagePaginationTableComponent,
    PageFormElementsComponent,
    PageFormLayoutComponent,
    PageFormValidationComponent,
    DialogOverviewExampleDialog,
    MuestraVideoAyuda,
    RegistraInfoUsuariosDialog,
    SpinnerDialog,
    SpinnerGuardaPedDialog,
    PageGoogleMapComponent,
    PageLeafletMapComponent,
    PageWidgetsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgSelectModule,                                                              
    CalendarModule.forRoot(),
    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyAU9f7luK3J31nurL-Io3taRKF7w9BItQE'
    }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [
                AuthGuard,
                AlertService,
                AuthenticationService,
                UserService,
                EmpresasService,
                TallasPantalonService,
                relacionPantalonC,
                Conf_Pedidos,
                datosUsuarioUpdateService,
                Caract_Productos,
                relacionCPantalon,
                guardaCabeceraPedido,
                guardaDetallePedido,
                guardaMensajeUsr, 
                sendEmail,
                existenciaPedidoCliente,
                { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [CalendarDialogComponent, DialogOverviewExampleDialog, RegistraInfoUsuariosDialog, 
                    MuestraVideoAyuda, SpinnerDialog, SpinnerGuardaPedDialog, FormContactoDialog,
                    RegistraMensajeUsrDialog, infoMailDialog, respuestaElementDialog ],
  bootstrap: [AppComponent]
})
export class AppModule { }
