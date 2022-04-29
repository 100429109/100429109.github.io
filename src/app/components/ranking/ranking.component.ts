import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../../services/data.service';
import { establecimiento } from '../../model/model.interface';
import { comentario } from '../../model/model.interface';
import { Observable, of } from "rxjs";

var loged =false
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  providers:[DataService]
})
export class RankingComponent implements OnInit {

  @Input() usuario_iniciado:any;

  public usuario_actual:any = -1;
  public selectedEstablecimiento: establecimiento ={
    id: 6, name: '', tipo: '',
    calle: '', localidad: '',
    descripcion: '', valoracion : 0, imagen :''};
  public locales: establecimiento[] = [];
  //public usuarios: usuario[]=[];
  public comments: comentario[] = [];
  public comemtar: comentario = {id: 0, establecimientoId: 0, usuario: '', comentario: ''};
  //public nuevo_usuario: usuario = {id:0, name: '',password: '', email:''};
  inputComentario = '';
  filterLista = '';
  constructor(private datasrv: DataService) { }

  ngOnInit(): void {
    this.refrescar()
  }

  ngOnChanges(changes:any) {
    console.log(changes, 'pooooooo')
    if (changes.nombre != "undefined" && changes.usuario_iniciado.currentValue != -1 && changes.usuario_iniciado.currentValue != 'ocultar' && changes.usuario_iniciado.currentValue != 'mostrar'){
      this.usuario_actual = changes.usuario_iniciado.currentValue;
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
    let div1 = document.getElementById('cuerpo') as HTMLBodyElement;
    div1.style.display = 'contents';
  }

  ocultar(){
    let div1 = document.getElementById('cuerpo') as HTMLBodyElement;
    div1.style.display = 'none';
  }

  refrescar() {
    this.datasrv.getEstablecimientos().subscribe(data => {
      this.locales = data;
      this.locales.sort((a,b) => b.valoracion - a.valoracion);
      console.log(this.locales);
    });
    this.datasrv.getComentarios().subscribe(data => {
      this.comments = data;
      console.log(this.comments);
    });
  }

  getEstablecimientos$():Observable<establecimiento[]> {
    return of(this.locales);
  }

  getComentarios$(id: any):Observable<comentario[]> {
    return of(this.comments.filter(establecimiento => establecimiento.establecimientoId == id));
  }

  clickCrearComentario(establecimientoId: any) {
    if (this.usuario_actual != -1){
    this.datasrv.crearComentario(establecimientoId, this.usuario_actual.name, this.inputComentario).subscribe(data => {
      this.comemtar = data;
      console.log(this.comemtar);
      this.refrescar();
    });
  }
  else{
    alert("No estás logado. Debes registrarte para comentar")
  }
  }

  cerrar_form(target: any){
    target.parentNode.parentNode.parentNode!.style.display = 'none';
  }

  abrir_popup(id: any) {
    document.getElementById('popup_est_especifico')!.style.display = "flex";
    var index = -1;
    for (var i=0; i<this.locales.length; ++i){
      if(this.locales[i].id == id){
        index = i;
      }
    }
    var img_popup =document.getElementById('img_est_popup') as HTMLImageElement;
    var imagen = this.locales[index].imagen;
    img_popup.src = imagen;
  
    var titulo_popup =document.getElementById('Titulo_est_popup');
    titulo_popup!.innerText = this.locales[index].name;
  
    var valoracion_popup = document.getElementById('valoracion_est_popup');
    valoracion_popup!.innerText = this.locales[index].valoracion;
  
    var tipo_popup = document.getElementById('tipo_est_popup');
    tipo_popup!.innerText = this.locales[index].tipo;
  
    var calle_popup = document.getElementById('calle_est_popup');
    calle_popup!.innerText = this.locales[index].calle;
  
    var localidad_popup = document.getElementById('localidad_est_popup');
    localidad_popup!.innerText = this.locales[index].localidad;
  
    var descripcion_popup = document.getElementById('descripcion_est_popup');
    descripcion_popup!.innerText = this.locales[index].descripcion;
  
  
  }

}
