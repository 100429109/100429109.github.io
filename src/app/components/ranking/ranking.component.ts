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
  //public usuarios: usuario[]=[];
  public comments: comentario[] = [];
  public comemtar: comentario = {id: 0, establecimientoId: 0, usuario: '', comentario: ''};
  //public nuevo_usuario: usuario = {id:0, name: '',password: '', email:''};
  inputComentario = '';
  inputPuntuacion= 0;
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
          console.log('cerrando')
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
    console.log(this.usuario_actual, 'publicando comentario')
    if (this.usuario_actual != -1){
    this.datasrv.crearComentario(establecimientoId, this.usuario_actual.name, this.inputComentario).subscribe(data => {
      console.log("data: ", data);
      this.comemtar = data;
      var input_coment = document.getElementById("comentario") as HTMLInputElement;
      input_coment.value = '';
      this.refrescar();
    });
  }
  else{
    var input_coment = document.getElementById("comentario") as HTMLInputElement;
    input_coment.value = '';
    alert("No estás logado. Debes registrarte para comentar")
  }
  }

  addPuntuacion(establecimientoId: any) {
    if (this.usuario_actual != -1){ 
      var index = 0;
      for (var i=0; i<this.locales.length; ++i){
        if (this.locales[i].id == establecimientoId){
          index = i;
          console.log("prueba: ", this.locales[i].valoraciones);
          this.locales[i].valoraciones.push(Number(this.inputPuntuacion));
          }};
      this.calcularMedia(index);
      

    }
    else{
      var input_puntuacion = document.getElementById("puntuacion") as HTMLInputElement;
      input_puntuacion.value = '';
      alert("No estás logado. Debes registrarte para comentar")
    }
    }
  sumar(valor1:number, valor2:number): number {
    return valor1+valor2;
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
    valoracion_popup!.innerText = String(this.locales[index].valoracion);
  
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
