import { RankingComponent } from './components/ranking/ranking.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { usuario } from './model/model.interface';
import { Component, ViewChild } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'filterPipe';

  @ViewChild(RankingComponent) childRanking:any;
  @ViewChild(MapaComponent) childMapa:any;


  public usuarioCambio:any = -1;
  constructor () { }

  receiveMessage($event:any) {
    console.log($event, "recibimos cosas")
    if ($event != -1 && $event != 'ocultar' && $event != 'mostrar') {
      this.enviar($event);
    } else {
      if( $event == 'ocultar') {
        this.ocultar();
      } else {
        if ($event == 'mostrar') {
          this.mostrar()
        }
      }
    }
  }

  mostrar() {
    this.usuarioCambio = 'mostrar';
  }

  ocultar() {
    this.usuarioCambio = 'ocultar';
  }

  enviar(datos:any) {
    var datos_str = JSON.stringify(datos);
    console.log(datos_str, 'usuario desde app', typeof(datos_str))
    this.usuarioCambio = datos_str;
  }

}
