import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  title = 'Lab13';
  angForm!: FormGroup;
  year: any = [];
  counter(i: number) { return new Array(i) }
  years() {
    for (let i = 0; i <= 100; i++) {
      this.year[i] = [1950 + i];
    }
    return this.year;
  }
  months() {
    return new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
      'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre')
  }

  createForm() {
    this.angForm = this.fb.group({
      nombre: [''],
      primer_apellido: [''],
      segundo_apellido: [''],
      dia_nacimiento: ['Dia'],
      mes_nacimiento: ['Mes'],
      año_nacimiento: ['Año'],
      email: [''],
      password: [''],
      password_repeat: ['']
    });
  }
  ngOnInit(): void {

  }

  onClickSubmit(email: string, password: string, mes_nacimiento: string) {
    alert('Tu email es : ' + mes_nacimiento)
  }
}
