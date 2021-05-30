import { Component } from '@angular/core';
import { ProductosService } from './services/productos.service'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab12Front';
  lista: any;
  prod: any = {
    codigo: null,
    descripcion: null,
    precio: null,
    imagen: null
  }

  img: any = {
    url: null
  }

  delete: any = [];

  images: any;

  getFiles(event: any) {
    this.images = event.target.files
  }

  constructor(private productosServicio: ProductosService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.recuperarTodos();
  }

  photoUrl(imag: string) {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/images/${imag}`);
  }

  recuperarTodos() {
    this.productosServicio.listar().subscribe((result: any) => {
      this.lista = result;
    });
  }

  nuevo() {
    this.productosServicio.nuevo(this.prod, this.images).subscribe((result: any) => {
      if (result.affectedRows === 1) {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  eliminar(codigo: any) {
    if (!confirm("Esta seguro que desea eliminar este registro?")) return;
    this.productosServicio.eliminar(codigo).subscribe((result: any) => {
      if (result == 'OK') {
        this.recuperarTodos();
        this.limpiar();
      }
    });
  }

  actualizar() {
    this.productosServicio.actualizar(this.prod, this.delete, this.images).subscribe((result: any) => {
      if (result.affectedRows == '1') {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  mostrar(codigo: any) {
    this.productosServicio.mostrar(codigo).subscribe((result: any) => {
      this.prod = result[0]
      this.delete = [];
    });
  }

  agregar(img: string) {
    if (this.delete.length > 0) {
      this.delete[this.delete.length] = img;
    } else {
      this.delete[0] = img;
    }
  }

  hayRegistros() {
    return true;
  }

  limpiar() {
    this.prod = {
      codigo: null,
      descripcion: null,
      precio: null
    };
  }

}
