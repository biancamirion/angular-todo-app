import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  newTodoTitle = '';
  todos: Todo[] = this.todoService.getTodos();
  
  constructor(private todoService: TodoService) {}

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo({
        ...this.todos,
        id: this.todos.length + 1,
        title: this.newTodoTitle,
        completed: false,
      });
      this.newTodoTitle = '';
    }
  }
}
