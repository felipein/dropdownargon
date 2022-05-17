import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/servicos/oauth/autenticacao.service';

@Component({
  selector: 'app-calculos-dashboard',
  templateUrl: './calculos-dashboard.component.html',
  styleUrls: ['./calculos-dashboard.component.scss']
})
export class CalculosDashboardComponent implements OnInit {

  constructor(private autenticacaoService:AutenticacaoService) { }

  ngOnInit(): void {
  }
  logout(){
    this.autenticacaoService.logout();

  }

}
