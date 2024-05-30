import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { TodoService } from './app/todo.service';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes), TodoService],
}).catch((err) => console.error(err));
