import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from './shared-service';
import {Router} from "@angular/router";
import { Location } from '@angular/common';


@Component({
  moduleId: module.id,
  selector: 'app-home-module-tallas',
  templateUrl: './home-module-tallas.component.html',
  styleUrls: ['./home-module-tallas.component.scss'],
  providers: [ SharedService ]
})
export class HomeModuleTallasComponent implements OnInit {
  //Local variables
  pageTitle: any;
  rtl: boolean = false;
  @Input() openedSidebar: boolean = false;  
//
  constructor( private _sharedService: SharedService, private route : Router, private location : Location) {
    _sharedService.changeEmitted$.subscribe(
      title => {
        this.pageTitle = title;
        this.openedSidebar = false;
      }
    );
  }

  ngOnInit() { 
    
  }

  getClasses() {
    return {
      'open-sidebar': this.openedSidebar,
      'rtl': this.rtl
    };
  }

  sidebarState() {
    this.openedSidebar = !this.openedSidebar;
  }

}
