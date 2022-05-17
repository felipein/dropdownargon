import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PisCofinsIcmsEnergiaComponent } from './pis-cofins-icms-energia/pis-cofins-icms-energia.component';
import { TributarioComponent } from './tributario.component';
import { TusdIcmsComponent } from './tusd-icms/tusd-icms.component';

const routes: Routes = [
  {
    path:'',
    component:TributarioComponent,
    children:[
      {
        path:'',
        redirectTo:'tusdicms',
        pathMatch:'full'
      },
      {
        path:'tusdicms',
        component:TusdIcmsComponent,
      },
      {
        path:'piscofinsicmsenergia',
        component:PisCofinsIcmsEnergiaComponent,
      },
      
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TributarioRoutingModule { }
