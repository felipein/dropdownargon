import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/servicos/oauth/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  test: Date = new Date();
  isCollapsed = true;
  constructor(private autenticacaoService:AutenticacaoService) {}

  ngOnInit() {}

  login(){
    this.autenticacaoService.login();
  }
}
