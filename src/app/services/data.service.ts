import { usuario } from './../model/model.interface';
import { establecimiento } from './../model/model.interface';
import { comentario } from './../model/model.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
  private usuarios : usuario[] = [
    {
      id: 0,
      name:'Pablo',
      password: 'holasoypablo',
      email:'holasoypablo#gmail.com'
    },
    {
      id: 1,
      name:'Mercedes',
      password: 'yonosoyMercedes123',
      email:'puedequesiseamercedes@gmail.com'
    },
    {
      id: 2,
      name:'Marta',
      password: 'xdxdjajant',
      email:'agustin@gmail.com'
    },
    {
      id: 3,
      name:'Martin',
      password: 'MuyBuEnaSATodOs',
      email:'volton44@gmail.com'
    },
    {
      id: 4,
      name:'Nicolas',
      password: 'mehanhechola131416',
      email:'pararrayos@gmail.com'
    },
    {
      id: 4,
      name:'Leonit',
      password: 'Konoplev:)',
      email:'kalasnokov@gmail.com'
    }
  ];
  
  getPedidos(): usuario[]{
    return this.usuarios;
  }

  setUsuarios(datos: any){
    console.log(this.usuarios)
    this.usuarios.push(datos);
    console.log(this.usuarios)
  }

  private urlEstablecimientos = "http://localhost:3000/establecimientos";
  private urlComentarios = "http://localhost:3000/comentarios";

  constructor(private http: HttpClient) {}

  public getEstablecimientos(): Observable<establecimiento[]>{
    return this.http.get<establecimiento[]>(this.urlEstablecimientos);
  }

  public getComentarios(): Observable<comentario[]>{
    return this.http.get<comentario[]>(this.urlComentarios);
  }

  public crearComentario(establecimientoId: any, usuario: string, comentario: string): Observable<comentario>{
    const headers = {'content-type': 'application/json'};  
    const body = {"establecimientoId": establecimientoId, "usuario": usuario, "comentario": comentario};
    console.log(body);
    return this.http.post<comentario>(this.urlComentarios, body, {'headers':headers});  
  } 
}

/*
@Injectable()
export class DataService {
  private usuarios : usuario[] = [
    {
      id: 0,
      name:'Pablo',
      password: 'holasoypablo',
      email:'holasoypablo#gmail.com'
    },
    {
      id: 1,
      name:'Mercedes',
      password: 'yonosoyMercedes123',
      email:'puedequesiseamercedes@gmail.com'
    },
    {
      id: 2,
      name:'Marta',
      password: 'xdxdjajant',
      email:'agustin@gmail.com'
    },
    {
      id: 3,
      name:'Martin',
      password: 'MuyBuEnaSATodOs',
      email:'volton44@gmail.com'
    },
    {
      id: 4,
      name:'Nicolas',
      password: 'mehanhechola131416',
      email:'pararrayos@gmail.com'
    },
    {
      id: 4,
      name:'Leonit',
      password: 'Konoplev:)',
      email:'kalasnokov@gmail.com'
    }
  ];
  
  getPedidos(): usuario[]{
    return this.usuarios;
  }

  setUsuarios(datos: any){
    console.log(this.usuarios)
    this.usuarios.push(datos);
    console.log(this.usuarios)
  }

  private establecimientos : establecimiento[] = [
    {
      id: 0,
      name:'El Olivo',
      tipo:'Hosteleria',
      calle: 'Carr. de Galapagar, 49, 28270 Colmenarejo, Madrid',
      localidad: 'Colmenarejo',
      descripcion:'Este bar cuenta con una rampa para el acceso por la puerta principal. Todas las puertas permiten el paso de una silla de ruedas. Además los baños están habilitados y no se requiere cambiar de planta para acceder a ellos.',
      valoracion : 4
    },
    {
      id: 1,
      name:'Nuit',
      tipo:'Pub/Discoteca',
      calle: 'C. de Orense, 10, 28020 Madrid',
      localidad: 'Madrid',
      descripcion:'Discoteca con buen acceso y un baño habilitado para personas con movilidad reducida.',
      valoracion : 3.5      
    },
    {
      id: 2,
      name:'Mercadona',
      tipo:'Comercio',
      calle: 'Av. Juan Carlos I, s/n, 28400 Collado Villalba, Madrid',
      localidad: 'Collado Villalba',
      descripcion:'Supermercado con ascensores y pasillos amplios. Correctamente habilitado para personas con movilidad reducida.',
      valoracion : 4.5    
    },
    {
      id: 3,
      name:'Cervecería Restaurante Parada y Fonda',
      tipo:'Hosteleria',
      calle: 'C. de Gómez del Campo, 13, 28280 El Escorial, Madrid',
      localidad: 'El Escorial',
      descripcion:'Buen acceso, su interior medianamente espacioso. No posee baño habilitado para personas con movilidad reducida',
      valoracion : 2    
    },
    {
      id: 4,
      name:'',
      tipo:'Hospedaje',
      calle: '',
      localidad: 'Colmenarejo',
      descripcion:'',
      valoracion : 0    
    },
    {
      id: 5,
      name:'Carniceria Mariano',
      tipo:'Comercio',
      calle: 'C. Traspalacio, 22, 28294 Robledo de Chavela, Madrid',
      localidad: 'Robledo de Chavela',
      descripcion:'Carnicería con rampa en el acceso y puertas automáticas.',
      valoracion : 5    
    }
  ];

  getEstablecimientos(): establecimiento[]{
    return this.establecimientos;
  }
}
*/