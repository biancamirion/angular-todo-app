import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent, AddTodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-app';
}
