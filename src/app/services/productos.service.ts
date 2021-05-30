import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  url = 'http://localhost:3000/producto/';
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(`${this.url}`);
  }

  nuevo(producto: Producto, images: FileList) {
    let formdata = new FormData();
    formdata.set('descripcion', producto.descripcion);
    formdata.set('precio', producto.precio);
    for (let i = 0; i < images.length; i++) {
      formdata.append(`uploads[${i}]`, images[i], images[i].name);
    }
    return this.http.post(`${this.url}`, formdata);
  }

  eliminar(codigo: string) {
    return this.http.delete(`${this.url}${codigo}`, { responseType: 'text' });
  }

  mostrar(codigo: string) {
    return this.http.get(`${this.url}mostrar/${codigo}`);
  }

  actualizar(producto: Producto, dell: any, images: any) {
    let formdata = new FormData();
    formdata.set('codigo', producto.codigo.toString());
    formdata.set('descripcion', producto.descripcion);
    formdata.set('precio', producto.precio);
    formdata.set('dell[]', dell);
    if (images != null) {
      for (let i = 0; i < images.length; i++) {
        formdata.append(`uploads[${i}]`, images[i], images[i].name);
      }
    }
    return this.http.put(`${this.url}`, formdata);
  }
}

type Producto = {
  codigo: number
  descripcion: string,
  precio: string
}
