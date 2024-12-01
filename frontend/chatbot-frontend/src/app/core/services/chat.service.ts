import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = `${environment.apiBaseUrl}/chat`;

  constructor(private http: HttpClient, private router: Router) {}

  getChatHistory(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/chat-history/`);
  }

  postMessage(message: any): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/post-chat/`, message);
  }
}
