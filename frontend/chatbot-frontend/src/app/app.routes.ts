import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { ChatComponent } from './modules/chat/chat.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
