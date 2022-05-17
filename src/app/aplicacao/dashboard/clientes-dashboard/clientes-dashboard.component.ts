import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelos/usuario/cliente';
import { ListarClientesDoUsuarioService } from 'src/app/servicos/usuario/listar-clientes-do-usuario.service';
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

@Component({
  selector: 'app-clientes-dashboard',
  templateUrl: './clientes-dashboard.component.html',
  styleUrls: ['./clientes-dashboard.component.scss']
})
export class ClientesDashboardComponent implements OnInit {

  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: Cliente[] = [];
  SelectionType = SelectionType;

  constructor(private listarClientesDoUsuarioService:ListarClientesDoUsuarioService) {

    this.listarClientesDoUsuarioService.listarClientes()
    .then(clientes=>{
      this.rows = clientes as Cliente[];
      this.temp = this.rows
      .map((prop,key)=>{
        return {
          ...prop,
          id: key
        };
      });
    });
    
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  ngOnInit() {}

}
