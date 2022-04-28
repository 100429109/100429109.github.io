import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from './../../services/data.service';
import { establecimiento } from '../../model/model.interface';
import { comentario } from '../../model/model.interface';
import { Observable, of } from "rxjs";


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [DataService]
})
export class UsuariosComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<any>();

  public usuario_actual:any = -1;
  public datos: any;
  
  constructor(private datasrv: DataService) { }

  ngOnInit() {
  }

  cerrar_form(target: any){
    target.parentNode.parentNode.parentNode!.style.display = 'none';
    document.getElementById('cabecera')!.style.display = 'inline-block';
    this.sendMessage('mostrar');

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
    document.getElementById('cabecera')!.style.display = 'inline-block';
    this.sendMessage('mostrar');
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
    document.getElementById('cabecera')!.style.display = 'none';
    this.sendMessage('ocultar');
  }

  sign_up(){
    document.getElementById('organizador2')!.style.display = 'flex';
    document.getElementById('cabecera')!.style.display = 'none';
    this.sendMessage('ocultar');
  }

  log_out(){
    document.getElementById('organizador4')!.style.display = 'none';
    document.getElementById('organizador3')!.style.display = 'flex';
  }

  cerrar_sesion(){
    this.usuario_actual = -1;
    this.sendMessage(this.usuario_actual);
    document.getElementById('organizador3')!.style.display = 'none';
    document.getElementById("miPerfil")!.style.display="none";
    document.getElementById("lista2")!.style.display="flex";

    document.getElementById('cabecera')!.style.display = 'inline-block';
    this.sendMessage('mostrar');
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

          this.sendMessage(this.usuario_actual);
  
          document.getElementById('organizador1')!.style.display = 'none';
          document.getElementById("lista2")!.style.display="none";
          document.getElementById("miPerfil")!.style.display="block";

          document.getElementById('cabecera')!.style.display = 'inline-block';
          this.sendMessage('mostrar');
      
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

        this.sendMessage(this.usuario_actual);

        document.getElementById('organizador2')!.style.display = 'none';
        document.getElementById("lista2")!.style.display="none";
        document.getElementById("miPerfil")!.style.display="block";

        document.getElementById('cabecera')!.style.display = 'inline-block';
        this.sendMessage('mostrar');

        var resetForm = <HTMLFormElement>document.getElementById('sign_up');
        resetForm.reset();
        
      }
      else{
        var resetForm = <HTMLFormElement>document.getElementById('sign_up');
        resetForm.reset();
      }
    }
  }

  abrir_perfil(){
    document.getElementById("organizador4")!.style.display="flex";
    document.getElementById('cabecera')!.style.display = 'none';
    this.sendMessage('ocultar');
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

  sendMessage(mensaje:any) {
    this.messageEvent.emit(mensaje)
  }
}