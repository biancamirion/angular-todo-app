import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { TodoService } from './app/todo.service';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), TodoService],
}).catch((err) => console.error(err));
