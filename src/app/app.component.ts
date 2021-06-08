import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Heroes que pueden volar';
  heroes: any[] = [];
  canFly = true;
  mutate = true;
  birthDay = new Date();

  power = 5;
  factor = 1;

  constructor() { this.reset(); console.log(this.birthDay)}

  addHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    let hero = { name, canFly: this.canFly, birthDay: this.birthDay };
    this.heroes = this.heroes.concat(hero);
  }

  reset() { this.heroes = []; }

  
  get format() { return this.mutate ? 'shortDate' : 'fullDate'; }

  change() { this.mutate = !this.mutate; }
}
