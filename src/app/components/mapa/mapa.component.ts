import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  title = 'filterPipe';

  @Input() usuario_iniciado:any;

  ngOnChanges(changes:any) {
    console.log(changes, 'pooooooo')
    if (changes.nombre != "undefined" && changes.usuario_iniciado.currentValue != -1 && changes.usuario_iniciado.currentValue != 'ocultar' && changes.usuario_iniciado.currentValue != 'mostrar'){
    } else {
      if(changes.usuario_iniciado.currentValue == 'ocultar') {
        this.ocultar();
      } else {
        if(changes.usuario_iniciado.currentValue == 'mostrar') {
          this.mostrar();
        }
      }
    }
  }

  mostrar() {
    let div1 = document.getElementById('mapa') as HTMLDivElement;
    div1.style.display = 'flex';
  }

  ocultar(){
    let div1 = document.getElementById('mapa') as HTMLDivElement;
    div1.style.display = 'none';
  }

  lat: number;
  lng: number;
  zoom: number;

  lat1: number;
  lng1: number;

  lat2: number;
  lng2: number;

  lat3: number;
  lng3: number;

  lat4: number;
  lng4: number;

  lat5: number;
  lng5: number;

  lat6: number;
  lng6: number;

  constructor () {
    this.lat = 40.59;
    this.lng = -3.63;
    this.zoom = 8.5;
    /** Mercadona Collado Villalba */
    this.lat1 = 40.65269571422229;
    this.lng1 = -4.007315900455032;
    /** La Perla */
    this.lat2 = 40.6288173720967;
    this.lng2 = -4.013888596764439;
    /** El Olivo */
    this.lat3 = 40.56638441433393;
    this.lng3 = -4.012773401149934;
    /** Nuit */
    this.lat4 = 40.44898860449167;
    this.lng4 = -3.694924071626357;
    /** Cervecería Restaurante Parada y Fonda */
    this.lat5 = 40.58544073696735;
    this.lng5 = -4.131269735404272;
    /** Carniceria Mariano */
    this.lat6 = 40.500469385594776;
    this.lng6 = -4.236862966087737;
  }

  ngOnInit(): void {
  }

}
