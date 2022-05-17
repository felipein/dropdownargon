import { Component, HostListener } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Usuario } from "./modelos/usuario/usuario";
import { AutenticacaoService } from "./servicos/oauth/autenticacao.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  @HostListener('window:unload', ['$event'])
      onUnload(event){
        console.log('app component unloaded');
        console.log(this.autenticacaoService.usuario());
        localStorage.setItem('usuario', JSON.stringify(this.autenticacaoService.usuario()));
      }

  constructor(private router: Router,
    private autenticacaoService:AutenticacaoService) {

      this.router.events.subscribe((event)=>{
        if(event instanceof NavigationStart){
          let usuario:Usuario = JSON.parse(localStorage.getItem('usuario'));
          if(Object.keys(usuario) != null && !(Object.keys(usuario).length === 0)){
            this.autenticacaoService.setUsuario(usuario);
            console.log('usuario carregado do localstorage')
          }else{
            console.log('usuario undefined');
          }
        }
      });
    
    

     this.router.events.subscribe((event: Event) => {
         if (event instanceof NavigationStart) {
             // Show loading indicator
             window.scrollTo(0,0);
         }

         if (event instanceof NavigationEnd) {
             // Hide loading indicator
         }

         if (event instanceof NavigationError) {
             // Hide loading indicator

             // Present error to user
             console.log(event.error);
         }
     });
   }
}
