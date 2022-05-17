import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { PaginasComponent } from './paginas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    PaginasComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ]
})
export class PaginasModule { }
