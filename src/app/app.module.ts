import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlyingHeroesPipe } from './flying-heroes.pipe';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { FetchJsonPipePipe } from './fetch-json-pipe.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FlyingHeroesPipe,
    ExponentialStrengthPipe,
    FetchJsonPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
