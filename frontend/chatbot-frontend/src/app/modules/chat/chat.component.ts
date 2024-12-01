import { Component, inject } from '@angular/core';
import { ChatMessage } from '../../core/models/chat.model';
import { ChatService } from '../../core/services/chat.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormatTextPipe } from '../../core/pipes/format-text.pipe';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-chat',
  imports: [DatePipe, CommonModule, FormatTextPipe, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  username?: string;
  chatService = inject(ChatService);
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  chatHistory: ChatMessage[] = [];
  chatForm = new FormGroup({
    user_message: new FormControl('', Validators.required),
  });
  isLoading = false;
  userMessage: string = '';

  ngOnInit() {
    this.retrieveChatHistory();
  }

  retrieveChatHistory() {
    this.chatService.getChatHistory().subscribe((response: ChatMessage[]) => {
      this.chatHistory = response.map((item: ChatMessage) => ({
        user_message: item.user_message,
        chatbot_response: item.chatbot_response,
        created_at: item.created_at,
      }));
    });
  }

  sendMessage() {
    if (!this.chatForm.value.user_message?.trim()) return;

    const userMessage: ChatMessage = {
      user_message: this.chatForm.value.user_message?.trim(),
    };

    this.isLoading = true;
    this.chatService.postMessage(userMessage).subscribe({
      next: (response: ChatMessage) => {
        this.chatHistory.push(response);
        this.chatForm.reset();
        this.isLoading = false;
        // this.userMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        console.log('error> ', error.error);

        this.toastr.error('An unknown error occurred.', 'Login Failed');
        this.isLoading = false;
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
