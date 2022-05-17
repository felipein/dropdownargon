import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationModule } from "./pages/presentation/presentation.module";

import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from "./components/components.module";

import { AppRoutingModule } from './app-routing.module';
import { AplicacaoModule } from './aplicacao/aplicacao.module';
import { ServicosModule } from './servicos/servicos.module';
import { OAuthModule } from "angular-oauth2-oidc";
import { PaginasModule } from './paginas/paginas.module';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    PresentationModule,
    BrowserModule,
    AppRoutingModule,
    AplicacaoModule,
    ServicosModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['https://calculeiappapi.azurewebsites.net'],
          sendAccessToken: true,
          // referencia para azure function autenticada com b2c
          // https://medium.com/@ravindraa/secure-azure-functions-using-azure-ad-b2c-986e4ad07c6c
      }
    }),
    PaginasModule,
    FontAwesomeModule
    
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },

    /* if you don't provide the currency symbol in the pipe, 
    this is going to be the default symbol (R$) ... */
    {
        provide:  DEFAULT_CURRENCY_CODE,
        useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
