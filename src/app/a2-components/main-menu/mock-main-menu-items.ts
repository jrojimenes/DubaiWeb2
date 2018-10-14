import { MainMenuItem } from './main-menu-item';
import {perfilAcceso} from '../../models';


export const MAINMENUITEMS: MainMenuItem[] = [
  {
    title: 'Menu Principal',
    icon: '',
    active: true,
    groupTitle : true,
    sub: '',
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: ''
  },
  {
    title: 'Inicio',
    icon: 'fa fa-home',
    active: false,
    groupTitle: false,
    sub: [
      {
        title: 'Mi Perfil',
        routing: '/home_tallas/form-layout'
      }
    ],
    routing: '/home_tallas/form-layout',
    externalLink: '',
    budge: '',
    budgeColor: ''
  },
  // {
  //   title: 'Widgets',
  //   icon: 'fa fa-th',
  //   active: false,
  //   groupTitle : false,
  //   sub: '',
  //   routing: '/home_tallas/widgets',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  // {
  //   title: 'Calendar',
  //   icon: 'fa fa-calendar',
  //   active: false,
  //   groupTitle : false,
  //   sub: '',
  //   routing: '/home_tallas/calendar',
  //   externalLink: '',
  //   budge: 'New',
  //   budgeColor: '#008000'
  // },
  // {
  //   title: 'UI Elements',
  //   icon: '',
  //   active: false,
  //   groupTitle : true,
  //   sub: '',
  //   routing: '',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  // {
  //   title: 'Material components',
  //   icon: 'fa fa-briefcase',
  //   active: false,
  //   groupTitle: false,
  //   sub: [
  //     {
  //       title: 'Button',
  //       routing: '/home_tallas/button'
  //     },
  //     {
  //       title: 'Card',
  //       routing: '/home_tallas/card'
  //     },
  //     {
  //       title: 'Checkbox',
  //       routing: '/home_tallas/checkbox'
  //     },
  //     {
  //       title: 'Chips',
  //       routing: '/home_tallas/chips'
  //     },
  //     {
  //       title: 'Dialog',
  //       routing: '/home_tallas/dialog'
  //     },
  //     {
  //       title: 'Icon',
  //       routing: '/home_tallas/icon'
  //     },
  //     {
  //       title: 'Input',
  //       routing: '/home_tallas/input'
  //     },
  //     {
  //       title: 'List',
  //       routing: '/home_tallas/list'
  //     },
  //     {
  //       title: 'Menu',
  //       routing: '/home_tallas/menu'
  //     },
  //     {
  //       title: 'Progress bar',
  //       routing: '/home_tallas/progress-bar'
  //     },
  //     {
  //       title: 'Progress spinner',
  //       routing: '/home_tallas/progress-spinner'
  //     },
  //     {
  //       title: 'Radio Button',
  //       routing: '/home_tallas/radio-button'
  //     },
  //     {
  //       title: 'Select',
  //       routing: '/home_tallas/select'
  //     },
  //     {
  //       title: 'Slider',
  //       routing: '/home_tallas/slider'
  //     },
  //     {
  //       title: 'Slide toggle',
  //       routing: '/home_tallas/slide-toggle'
  //     },
  //     {
  //       title: 'Snackbar',
  //       routing: '/home_tallas/snackbar'
  //     },
  //     {
  //       title: 'Tabs',
  //       routing: '/home_tallas/tabs'
  //     },
  //     {
  //       title: 'Toolbar',
  //       routing: '/home_tallas/toolbar'
  //     },
  //     {
  //       title: 'Tooltip',
  //       routing: '/home_tallas/tooltip'
  //     }
  //   ],
  //   routing: '',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  // {
  //   title: 'A2 components',
  //   icon: 'fa fa-diamond',
  //   active: false,
  //   groupTitle: false,
  //   sub: [
  //     {
  //       title: 'Alert',
  //       routing: '/home_tallas/alert'
  //     },
  //     {
  //       title: 'Badge',
  //       routing: '/home_tallas/badge'
  //     },
  //     {
  //       title: 'Breadcrumb',
  //       routing: '/home_tallas/breadcrumb'
  //     },
  //     {
  //       title: 'Card',
  //       routing: '/home_tallas/a2-card'
  //     },
  //     {
  //       title: 'File',
  //       routing: '/home_tallas/file'
  //     }
  //   ],
  //   routing: '',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  // {
  //   title: 'Typography',
  //   icon: 'fa fa-font',
  //   active: false,
  //   groupTitle : false,
  //   sub: '',
  //   routing: '/home_tallas/typography',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  // {
  //   title: 'Tables',
  //   icon: 'fa fa-table',
  //   active: false,
  //   groupTitle: false,
  //   sub: [
  //     {
  //       title: 'Simple table',
  //       routing: '/home_tallas/simple-table'
  //     },
  //     {
  //       title: 'Sorting table',
  //       routing: '/home_tallas/sorting-table'
  //     },
  //     {
  //       title: 'Filtering table',
  //       routing: '/home_tallas/filtering-table'
  //     },
  //     {
  //       title: 'Pagination table',
  //       routing: '/home_tallas/pagination-table'
  //     },
  //     {
  //       title: 'Bootstrap tables',
  //       routing: '/home_tallas/bootstrap-tables'
  //     },
  //   ],
  //   routing: '',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  {
    title: ' Tallas',
    icon: 'fa fa-check-square-o',
    active: false,
    groupTitle: false,
    sub: [
      {
        title: 'Registro de Tallas',
        routing: '/home_tallas/form-validation'
      },
      {
        title: 'Mi pedido',
        routing: '/home_tallas/form-elements'
      }
    ],
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: ''
  },
  // {
  //   title: 'Charts',
  //   icon: 'fa fa-pie-chart',
  //   active: false,
  //   groupTitle: false,
  //   sub: [
  //     {
  //       title: 'Line Chart',
  //       routing: '/home_tallas/line-chart'
  //     },
  //     {
  //       title: 'Bar Chart',
  //       routing: '/home_tallas/bar-chart'
  //     },
  //     {
  //       title: 'Doughnut Chart',
  //       routing: '/home_tallas/doughnut-chart'
  //     },
  //     {
  //       title: 'Radar Chart',
  //       routing: '/home_tallas/radar-chart'
  //     },
  //     {
  //       title: 'Pie Chart',
  //       routing: '/home_tallas/pie-chart'
  //     },
  //     {
  //       title: 'Polar Area Chart',
  //       routing: '/home_tallas/polar-area-chart'
  //     },
  //     {
  //       title: 'Dynamic Chart',
  //       routing: '/home_tallas/dynamic-chart'
  //     }
  //   ],
  //   routing: '',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  // {
  //   title: 'Maps',
  //   icon: 'fa fa-map-marker',
  //   active: false,
  //   groupTitle: false,
  //   sub: [
  //     {
  //       title: 'Google map',
  //       routing: '/home_tallas/google-map'
  //     },
  //     {
  //       title: 'Leaflet map',
  //       routing: '/home_tallas/leaflet-map'
  //     }
  //   ],
  //   routing: '',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  // {
  //   title: 'Pages',
  //   icon: '',
  //   active: false,
  //   groupTitle : true,
  //   sub: '',
  //   routing: '',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  // {
  //   title: 'Pages service',
  //   icon: 'fa fa-edit',
  //   active: false,
  //   groupTitle: false,
  //   sub: [
  //     {
  //       title: 'About Us',
  //       routing: '/home_tallas/about-us'
  //     },
  //     {
  //       title: 'FAQ',
  //       routing: '/home_tallas/faq'
  //     },
  //     {
  //       title: 'TimeLine',
  //       routing: '/home_tallas/timeline'
  //     },
  //     {
  //       title: 'Invoice',
  //       routing: '/home_tallas/invoice'
  //     },
  //   ],
  //   routing: '',
  //   externalLink: '',
  //   budge: 'New',
  //   budgeColor: '#008000'
  // },
  // {
  //   title: 'Extra pages',
  //   icon: 'fa fa-clone',
  //   active: false,
  //   groupTitle: false,
  //   sub: [
  //     {
  //       title: 'Sign In 1',
  //       routing: '/extra-layout/sign-in'
  //     },
  //     {
  //       title: 'Sign In 2',
  //       routing: '/home_tallas/sign-in'
  //     },
  //     {
  //       title: 'Sign In with Social',
  //       routing: '/extra-layout/sign-in-social'
  //     },
  //     {
  //       title: 'Sign Up 1',
  //       routing: '/extra-layout/sign-up'
  //     },
  //     {
  //       title: 'Sign Up 2',
  //       routing: '/home_tallas/sign-up'
  //     },
  //     {
  //       title: 'Forgot password',
  //       routing: '/extra-layout/forgot'
  //     },
  //     {
  //       title: 'Confirm email',
  //       routing: '/extra-layout/confirm'
  //     },
  //     {
  //       title: '404',
  //       routing: '/extra-layout/page-404'
  //     },
  //     {
  //       title: '500',
  //       routing: '/extra-layout/page-500'
  //     },
  //     {
  //       title: 'Not found',
  //       routing: '/home_tallas/not-found'
  //     }
  //   ],
  //   routing: '',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // }
];
