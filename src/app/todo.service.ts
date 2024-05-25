import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  getTodos() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: todo.title,
      completed: false,
    };
    this.todos.push(newTodo);
  }

  toggleTodoComplete(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].completed = !this.todos[index].completed;
  }

  deleteTodo(todo: Todo) {
    console.log('todo', todo);
    
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }
}
