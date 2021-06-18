import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;
  server = "http://localhost:9000"

  constructor() {
    this.socket = io(this.server);
  }

  listen(eventName: String) {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data: any) => {
        Subscriber.next(data);
      })
    })
  }

  emit(eventName: String, data: any) {
    this.socket.emit(eventName, data)
  }
}
