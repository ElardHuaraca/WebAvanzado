import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userChat = {
    user: '',
    text: ''
  }

  myMessages: any = [];
  eventName = "send message";

  constructor(private activatedRoute: ActivatedRoute, private websocketService: WebsocketService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.userChat.user = id;
    this.websocketService.listen('text event').subscribe((data) => {
      this.myMessages = data;
    })
  }

  myMessage() {
    this.websocketService.emit(this.eventName, this.userChat);
    this.userChat.text = '';
  }
}
