import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {HomeModuleTallasComponent} from './home-module-tallas/home-module-tallas.component'
import { AuthGuard } from './guards';


import { PageDashboardComponent }       from './pages/dashboard/dashboard.component';
import { PageDashboard2Component }      from './pages/dashboard-2/dashboard-2.component';

import { PageAlertComponent }           from './pages/a2-components/alert/alert.component';
import { PageBadgeComponent }           from './pages/a2-components/badge/badge.component';
import { PageBreadcrumbComponent }      from './pages/a2-components/breadcrumb/breadcrumb.component';
import { PageA2CardComponent }          from './pages/a2-components/a2-card/a2-card.component';
import { PageFileComponent }            from './pages/a2-components/file/file.component';

import { PageTypographyComponent }      from './pages/typography/typography.component';

import { PageAboutUsComponent }         from './pages/pages-service/about-us/about-us.component';
import { PageFaqComponent }             from './pages/pages-service/faq/faq.component';
import { PageTimelineComponent }        from './pages/pages-service/timeline/timeline.component';
import { PageInvoiceComponent }         from './pages/pages-service/invoice/invoice.component';
import { PageLineChartComponent }       from './pages/charts/line-chart/line-chart.component';
import { PageBarChartComponent }        from './pages/charts/bar-chart/bar-chart.component';
import { PageDoughnutChartComponent }   from './pages/charts/doughnut-chart/doughnut-chart.component';
import { PageRadarChartComponent }      from './pages/charts/radar-chart/radar-chart.component';
import { PagePieChartComponent }        from './pages/charts/pie-chart/pie-chart.component';
import { PagePolarAreaChartComponent }  from './pages/charts/polar-area-chart/polar-area-chart.component';
import { PageDynamicChartComponent }    from './pages/charts/dynamic-chart/dynamic-chart.component';
import { PageCalendarComponent }        from './pages/calendar/calendar.component';
import { PageSimpleTableComponent }     from './pages/tables/simple-table/simple-table.component';
import { PageBootstrapTablesComponent } from './pages/tables/bootstrap-tables/bootstrap-tables.component';
import { PageSortingTableComponent }    from './pages/tables/sorting-table/sorting-table.component';
import { PageFilteringTableComponent }  from './pages/tables/filtering-table/filtering-table.component';
import { PagePaginationTableComponent } from './pages/tables/pagination-table/pagination-table.component';
import { PageFormElementsComponent }    from './pages/forms/form-elements/form-elements.component';
import { PageFormLayoutComponent }      from './pages/forms/form-layout/form-layout.component';
import { PageFormValidationComponent }  from './pages/forms/form-validation/form-validation.component';
import { PageGoogleMapComponent }       from './pages/maps/google-map/google-map.component';
import { PageLeafletMapComponent }      from './pages/maps/leaflet-map/leaflet-map.component';
import { PageWidgetsComponent }         from './pages/widgets/widgets.component';

const defaultRoutes: Routes = [
    { path: 'dashboard', component: PageDashboardComponent },
    { path: 'dashboard-2', component: PageDashboard2Component },
    { path: 'typography', component: PageTypographyComponent },
    { path: 'widgets', component: PageWidgetsComponent },
    { path: 'calendar', component: PageCalendarComponent },
    
    { path: 'file', component: PageFileComponent },
    { path: 'a2-card', component: PageA2CardComponent },
    { path: 'alert', component: PageAlertComponent },
    { path: 'badge', component: PageBadgeComponent },
    { path: 'breadcrumb', component: PageBreadcrumbComponent },
    
    { path: 'about-us', component: PageAboutUsComponent },
    { path: 'faq', component: PageFaqComponent },
    { path: 'timeline', component: PageTimelineComponent },
    { path: 'invoice', component: PageInvoiceComponent },
    { path: 'line-chart', component: PageLineChartComponent },
    { path: 'bar-chart', component: PageBarChartComponent },
    { path: 'doughnut-chart', component: PageDoughnutChartComponent },
    { path: 'radar-chart', component: PageRadarChartComponent },
    { path: 'pie-chart', component: PagePieChartComponent },
    { path: 'polar-area-chart', component: PagePolarAreaChartComponent },
    { path: 'dynamic-chart', component: PageDynamicChartComponent },
    { path: 'simple-table', component: PageSimpleTableComponent },
    { path: 'bootstrap-tables', component: PageBootstrapTablesComponent },
    { path: 'sorting-table', component: PageSortingTableComponent },
    { path: 'filtering-table', component: PageFilteringTableComponent },
    { path: 'pagination-table', component: PagePaginationTableComponent },
    { path: 'form-elements', component: PageFormElementsComponent },
    { path: 'form-layout', component: PageFormLayoutComponent },
    { path: 'form-validation', component: PageFormValidationComponent },
    { path: 'google-map', component: PageGoogleMapComponent },
    { path: 'leaflet-map', component: PageLeafletMapComponent },
    // { path: '**', component: PageNotFoundComponent },
  ];

  

const appRoutes: Routes =[
{path: '', component:HomeComponent,
},
{path:'home_tallas', component: HomeModuleTallasComponent, canActivate: [AuthGuard],
children: defaultRoutes    
},
{
  path: '#/home_tallas',
  redirectTo: '/home_tallas/dashboard',
  pathMatch: 'full'
},
 
//Cualquier otra dirección, enviará al inicio
{path: '**', redirectTo:''}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
