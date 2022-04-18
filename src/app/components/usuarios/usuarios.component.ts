import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { establecimiento } from '../../model/model.interface';
import { comentario } from '../../model/model.interface';
import { Observable, of } from "rxjs";
//import nuevos_usuarios from '../../datos_json/datos_nuevos_usuarios.json';
//import * as fs from 'fs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [DataService]
})
export class UsuariosComponent implements OnInit {
  public usuario_actual:any = -1;
  public datos: any;
  public selectedEstablecimiento: establecimiento ={
    id: 6, name: '', tipo: '',
    calle: '', localidad: '',
    descripcion: '', valoracion : 0};
  constructor(private datasrv: DataService) { }
  public locales: establecimiento[] = [];
  public comments: comentario[] = [];
  public comemtar: comentario = {id: 0, establecimientoId: 0, usuario: '', comentario: ''};
  inputComentario = '';
  filterLista = '';

  
  ngOnInit() {
    this.refrescar()
  }

  refrescar() {
    this.datasrv.getEstablecimientos().subscribe(data => {
      this.locales = data;
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
    this.datasrv.crearComentario(establecimientoId, "sara", this.inputComentario).subscribe(data => {
      this.comemtar = data;
      console.log(this.comemtar);
      this.refrescar();
    });
  }

/*
  ngOnInit(): void {
    this.locales = this.datasrv.getEstablecimientos();
    //this.datos = nuevos_usuarios;
    //console.log(this.datos.lenght)
    //console.log(Object.keys(this.datos).length)
  }
*/
 

  cerrar_form(target: any){
    target.parentNode.parentNode.parentNode!.style.display = 'none';
  }

  cerrar_form2(target: any){
    target.parentNode.parentNode.parentNode.parentNode!.style.display = 'none';
    document.getElementById("organizador4")!.style.display="flex";
  }

  cerrar_form3(target: any){
    target.parentNode.parentNode.parentNode!.style.display = 'none';
    document.getElementById("organizador4")!.style.display="flex";
  }

  cerrar_menu_perfil(){
    document.getElementById("organizador4")!.style.display="none";
    document.getElementById("miPerfil")!.style.display="block";
  }

  cerrar_menu_perfil2(){
    document.getElementById("organizador5")!.style.display="none";
    document.getElementById("organizador4")!.style.display="flex";
  }

  cerrar_menu_perfil3(){
    document.getElementById("organizador6")!.style.display="none";
    document.getElementById("organizador4")!.style.display="flex";
  }


  login(){
    document.getElementById('organizador1')!.style.display = 'flex';

  }

  sign_up(){
    document.getElementById('organizador2')!.style.display = 'flex';
  }

  log_out(){
    document.getElementById('organizador4')!.style.display = 'none';
    document.getElementById('organizador3')!.style.display = 'flex';
  }

  cerrar_sesion(){
    this.usuario_actual = -1;
    document.getElementById('organizador3')!.style.display = 'none';
    document.getElementById("miPerfil")!.style.display="none";
    document.getElementById("lista2")!.style.display="flex";
  }

  iniciar_sesion(target:any){
    target.preventDefault();
    var usuario = (<HTMLInputElement>document.getElementById('login_nombre')).value;
    var contraseña = (<HTMLInputElement>document.getElementById('login_contrasena')).value;
    var usuarios = this.datasrv.getPedidos();
    if (usuario != '' && contraseña != ''){
      
      for (var i=0; i<usuarios.length; ++i) {
        var user = usuarios[i];
        if (user.name == usuario && user.password == contraseña){
          this.usuario_actual = usuarios[i];
  
          document.getElementById('organizador1')!.style.display = 'none';
          document.getElementById("lista2")!.style.display="none";
          document.getElementById("miPerfil")!.style.display="block";
      
          break
        }
      }
    }
    var resetForm = <HTMLFormElement>document.getElementById('login');
    resetForm.reset();
  }

  registro(target:any){
    target.preventDefault();
    var usuario = (<HTMLInputElement>document.getElementById('n_username')).value;
    var contraseña = (<HTMLInputElement>document.getElementById('n_contraseña')).value;
    var correo = (<HTMLInputElement>document.getElementById('n_mail')).value;
    var nombre = (<HTMLInputElement>document.getElementById('n_nombre')).value;
    var usuarios = this.datasrv.getPedidos();

  if (usuario != '' && contraseña != '' && correo != '' && nombre != ''){
      var repetido = false;
      for (var i=0; i<usuarios.length; ++i) {
        var user = usuarios[i];
        if (user.name == usuario){ 
          repetido = true;
          break
        }   
      }

      if (repetido != true){
        
        var datos = {id: usuarios.length, name: usuario, password: contraseña, email: correo};
        this.datasrv.setUsuarios(datos);
        this.usuario_actual = datos;

        document.getElementById('organizador2')!.style.display = 'none';
        document.getElementById("lista2")!.style.display="none";
        document.getElementById("miPerfil")!.style.display="block";
        var resetForm = <HTMLFormElement>document.getElementById('sign_up');
        resetForm.reset();
        
      }
      else{
        var resetForm = <HTMLFormElement>document.getElementById('sign_up');
        resetForm.reset();
      }
    }
  }
  // ESTO SERIA MAS O MENOS COMO HACER LO DEL LOCAL STORAGE PERO ES MAS COMODO USAR LAS LISTAS Y YA TA
  //setUsuarios(datos: any){
    //let key = Object.keys(this.datos).length;
    //this.datos[key] = nuevo_usuario;
    //var strdatos = JSON.stringify(this.datos, null, 2);

    //var values = [],
    //keys = Object.keys(localStorage),
    //i = keys.length;

   // while ( i-- ) {
    //    values.push( localStorage.getItem(keys[i]) );
    //}

    //return values;
    //fs.writeFileSync('../../datos_json/datos_nuevos_usuarios.json', strdatos);
    //console.log(Object.keys(this.datos).length, 'daleeeeeeee')
  //}

  abrir_perfil(){
    document.getElementById("organizador4")!.style.display="flex";
  }

  perfil(){
    document.getElementById("organizador5")!.style.display="flex";
    document.getElementById("organizador4")!.style.display="none";

    console.log('olaaaa')
  }

  comentarios(){
    document.getElementById("organizador6")!.style.display="flex";
    document.getElementById("organizador4")!.style.display="none";

  }

abrir_popup(id:number) {
  if (id==0){
    document.getElementById("modal_cont0")!.style.display="flex"
  }
  if (id==1){
    document.getElementById("modal_cont1")!.style.display="flex"
  }
  if (id==2){
    document.getElementById("modal_cont2")!.style.display="flex"
  }
  if (id==3){
    document.getElementById("modal_cont3")!.style.display="flex"
  }
  if (id==4){
    document.getElementById("modal_cont4")!.style.display="flex"
  }
  if (id==5){
    document.getElementById("modal_cont5")!.style.display="flex"
  }
}


cerrar_popup(target: any, id:number){
if (id==0){
  target.parentNode.parentNode.parentNode!.style.display = 'none';
  document.getElementById("modal_cont0")!.style.display="none";
}
if (id==1){
  target.parentNode.parentNode.parentNode!.style.display = 'none';
  document.getElementById("modal_cont1")!.style.display="none";
}
if (id==2){
  target.parentNode.parentNode.parentNode!.style.display = 'none';
  document.getElementById("modal_cont2")!.style.display="none";
}
if (id==3){
  target.parentNode.parentNode.parentNode!.style.display = 'none';
  document.getElementById("modal_cont3")!.style.display="none";
}
if (id==4){
  target.parentNode.parentNode.parentNode!.style.display = 'none';
  document.getElementById("modal_cont4")!.style.display="none";
}
if (id==5){
  target.parentNode.parentNode.parentNode!.style.display = 'none';
  document.getElementById("modal_cont4")!.style.display="none";
}
}
}
