import { usuario } from './../../model/model.interface';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../../services/data.service';
import { establecimiento } from '../../model/model.interface';
import { comentario } from '../../model/model.interface';
import { puntuacion} from '../../model/model.interface';
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
    descripcion: '', valoraciones : [], valoracion:0, imagen :''};
    public locales: establecimiento[] = [];
  public comments: comentario[] = [];
  public comemtar: comentario = {id: 0, establecimientoId: 0, usuario: '', comentario: ''};
  inputComentario = '';
  inputPuntuacion='';
  filterLista = '';
  constructor(private datasrv: DataService) { }

  ngOnInit(): void {
    this.refrescar()
  }

  ngOnChanges(changes:any) {
    if (changes.usuario_iniciado.currentValue != -1 && changes.usuario_iniciado.currentValue != 'ocultar' && changes.usuario_iniciado.currentValue != 'mostrar'){
      this.usuario_actual = JSON.parse(changes.usuario_iniciado.currentValue);
      this.mostrar();
    } else {
      if(changes.usuario_iniciado.currentValue == 'ocultar') {
        this.ocultar();
      } else {
        if(changes.usuario_iniciado.currentValue == 'mostrar') {
          this.usuario_actual = -1;
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
    });
    this.datasrv.getComentarios().subscribe(data => {
      this.comments = data;
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
      var input_coment = document.getElementById("comentario") as HTMLInputElement;
      input_coment.value = '';
      this.refrescar();
    });
  }
  else{
    var input_coment = document.getElementById("comentario") as HTMLInputElement;
    input_coment.value = '';
    alert("No est??s logado. Debes registrarte para comentar")
  }
  }

  addPuntuacion(establecimientoId: any) {
    if (this.usuario_actual != -1){ 
      var index = 0;
      var input_puntuacion = document.getElementById("puntuacion") as HTMLInputElement;
      input_puntuacion.value = '';
      for (var i=0; i<this.locales.length; ++i){
        if (this.locales[i].id == establecimientoId){
          index = i;
          this.locales[i].valoraciones.push(Number(this.inputPuntuacion));
          }};
      this.calcularMedia(index);
      this.datasrv.setEstablecimiento(this.locales[index]).subscribe();
      

    }
    else{
      var input_puntuacion = document.getElementById("puntuacion") as HTMLInputElement;
      input_puntuacion.value = '';
      alert("No est??s logado. Debes registrarte para comentar")
    }
    }
  calcularMedia(index: any): void{
    var contador = 0;
    var total = 0
    for( var i=0; i<this.locales[index].valoraciones.length; ++i){
      contador += 1;
      total += Number(this.locales[index].valoraciones[i]);
      }
    this.locales[index].valoracion = (total/contador);
  }

  cerrar_form(){
    document.getElementById("popup_est_especifico")!.style.display = 'none';
    var ul_general = document.getElementById("comentarios_est_popup");
    while(ul_general!.childNodes.length > 0){
      ul_general!.removeChild(ul_general!.childNodes[0]);
    }
  }

  abrir_popup(id: any) {
    document.getElementById('popup_est_especifico')!.style.display = "flex";
    var index = -1;
    var lista_coments = [];
    for (var i=0; i<this.locales.length; ++i){
      if(this.locales[i].id == id){
        index = i;
      }
    }
    for (var i= 0; i< this.comments.length; ++i){
      if(id == this.comments[i].establecimientoId){
        lista_coments.push(this.comments[i])
      }
    }
    var img_popup =document.getElementById('img_est_popup') as HTMLImageElement;
    var imagen = this.locales[index].imagen;
    img_popup.src = imagen;
  
    var titulo_popup =document.getElementById('Titulo_est_popup');
    titulo_popup!.innerText = this.locales[index].name;
  
    var valoracion_popup = document.getElementById('valoracion_est_popup');
    valoracion_popup!.innerText = String(this.locales[index].valoracion);
  
    var tipo_popup = document.getElementById('tipo_est_popup');
    tipo_popup!.innerText = this.locales[index].tipo;
  
    var calle_popup = document.getElementById('calle_est_popup');
    calle_popup!.innerText = this.locales[index].calle;
  
    var localidad_popup = document.getElementById('localidad_est_popup');
    localidad_popup!.innerText = this.locales[index].localidad;
  
    var descripcion_popup = document.getElementById('descripcion_est_popup');
    descripcion_popup!.innerText = this.locales[index].descripcion;
  
    for (var i= 0; i< lista_coments.length; ++i){
      var li = document.createElement('li');
      li.setAttribute('id', 'li_comentarios_'+ i.toString());
      li.setAttribute('class', 'listilla_comentarios'); 
      li.innerText = lista_coments[i].usuario + ': ' + lista_coments[i].comentario;
      var ul = document.getElementById("comentarios_est_popup");
      ul!.appendChild(li);
    }
    
  }

}
