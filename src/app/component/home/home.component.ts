import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  User: user = {
    name: ""
  }

  constructor() { }

  ngOnInit(): void {
  }

}

type user = {
  name: string
}