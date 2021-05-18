import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  url = 'http://localhost:3000/producto/';
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(`${this.url}`);
  }

  nuevo(producto: Producto) {
    return this.http.post(`${this.url}`, producto);
  }

  eliminar(codigo: string) {
    return this.http.delete(`${this.url}${codigo}`,{responseType: 'text'});
  }

  mostrar(codigo: string) {
    return this.http.get(`${this.url}mostrar/${codigo}`);
  }

  actualizar(producto: Producto) {
    return this.http.put(`${this.url}`, producto);
  }
}

type Producto = {
  codigo:number
  descripcion : string,
  precio : string
}
