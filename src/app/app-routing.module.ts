import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationComponent } from "./pages/presentation/presentation.component";
import { AutorizacaoService } from "./servicos/oauth/autorizacao.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "paginas",
    pathMatch: "full"
  },
  {
    path: "aplicacao",
    canActivate:[AutorizacaoService],
    loadChildren: () => import('./aplicacao/aplicacao.module').then(m => m.AplicacaoModule)
  },
  {
    path: "paginas",
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  },
  





  {
    path: "homeargon",
    redirectTo: "presentation",
    pathMatch: "full"
  },
  {
    path: "presentation",
    component: PresentationComponent
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dashboards",
        loadChildren: () => import('./pages/dashboards/dashboards.module').then(m => m.DashboardsModule)

      },
      {
        path: "components",
        loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule)
      },
      {
        path: "forms",
        loadChildren: () => import('./pages/forms/forms.module').then(m => m.FormsModules)
      },
      {
        path: "tables",
        loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: "maps",
        loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsModule)
      },
      {
        path: "widgets",
        loadChildren: () => import('./pages/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: "charts",
        loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: "calendar",
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: "examples",
        loadChildren: () => import('./pages/examples/examples.module').then(m => m.ExamplesModule)
      }
    ]
  },
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      {
        path: "examples",
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "paginas"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
