import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TributarioRoutingModule } from './tributario-routing.module';
import { TributarioComponent } from './tributario.component';
import { TusdIcmsComponent } from './tusd-icms/tusd-icms.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PisCofinsIcmsEnergiaComponent } from './pis-cofins-icms-energia/pis-cofins-icms-energia.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { TagInputModule } from 'ngx-chips';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    TributarioComponent,
    TusdIcmsComponent,
    PisCofinsIcmsEnergiaComponent
  ],
  imports: [
    CommonModule,
    TributarioRoutingModule,
    NgxDatatableModule,
    FormsModule,
    TagInputModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
   
    
  ]
})
export class TributarioModule { }
