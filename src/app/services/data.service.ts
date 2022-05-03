import { usuario } from './../model/model.interface';
import { establecimiento } from './../model/model.interface';
import { comentario } from './../model/model.interface';
import { Injectable } from '@angular/core';
import { puntuacion } from './../model/model.interface';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DataService {

  //private urlEstablecimientos = "http://localhost:3000/establecimientos";
  //private urlComentarios = "http://localhost:3000/comentarios";
  //private urlUsuarios = "http://localhost:3000/usuarios";
  private urlEstablecimientos = "http://212.170.107.165:3000/establecimientos";
  private urlComentarios = "http://212.170.107.165:3000/comentarios";
  private urlUsuarios = "http://212.170.107.165:3000/usuarios";

  constructor(private http: HttpClient) {}

  public getEstablecimientos(): Observable<establecimiento[]>{
    return this.http.get<establecimiento[]>(this.urlEstablecimientos);
  }

  public getComentarios(): Observable<comentario[]>{
    return this.http.get<comentario[]>(this.urlComentarios);
  }

  public getUsuarios(): Observable<usuario[]>{
    return this.http.get<usuario[]>(this.urlUsuarios);
  }
  
  public setEstablecimiento(local: establecimiento): Observable<void>{
    return this.http.put<void>(`${this.urlEstablecimientos}/${local.id}`, local);
  }

  public crearComentario(establecimientoId: any, usuario: string, comentario: string): Observable<comentario>{
    const headers = {'content-type': 'application/json'};  
    const body = {"establecimientoId": establecimientoId, "usuario": usuario, "comentario": comentario};
    console.log(body);
    console.log("HOLAAA", this.http.post<comentario>(this.urlComentarios, body, {'headers':headers}))
    console.log("us", this.http.get<usuario[]>(this.urlUsuarios))
    return this.http.post<comentario>(this.urlComentarios, body, {'headers':headers});  
    
  } 
  public crearUsuario(id: any, name: string, password: string, email: string): Observable<usuario>{
    const headers = {'content-type': 'application/json'};  
    const body = {"id": id, "name": name, "password": password, "email": email};
    console.log(body);
    console.log("HOLAAA", this.http.post<comentario>(this.urlComentarios, body, {'headers':headers}))
    console.log("us", this.http.get<usuario[]>(this.urlUsuarios))
    return this.http.post<usuario>(this.urlUsuarios, body, {'headers':headers});  
    
  } 
  
}

