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

  getTodoById(id: number) {
    return this.todos.find((todo) => todo.id === id);
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

  updateTodo(updatedTodo: Todo | undefined) {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo?.id);
    if (index > -1) {
      this.todos[index] = updatedTodo as Todo;
    }
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }
}
