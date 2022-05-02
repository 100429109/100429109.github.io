
export interface usuario {
    id: any,
    name: string,
    password: string,
    email:string
}

export interface establecimiento{
    id: any,
    name: string,
    tipo: string,
    calle: string,
    localidad: string,
    descripcion: string,
    valoraciones : any,
    valoracion: number,
    imagen: any
}

export interface comentario {
    id: any,
    establecimientoId: any,
    usuario: string,
    comentario:string
}

export interface puntuacion {
    establecimientoId: any,
    valor: number
}

