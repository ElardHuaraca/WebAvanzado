import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:3000/api';
  token?: string

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.http.post(this.uri + '/authenticate', { email: email, password: password }).subscribe((res: any) => {
      this.router.navigate(['profile']);
      localStorage.setItem('auth_token', res.token);
    });
  }
}
