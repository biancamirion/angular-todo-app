import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  private apiUrl = 'http://localhost:3000/todos';
  private todosUpdated = new Subject<Todo[]>();

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodosUpdatedListener(): Observable<Todo[]> {
    return this.todosUpdated.asObservable();
  }

  getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      tap(() => {
        this.getTodos().subscribe((todos) => {
          this.todosUpdated.next(todos);
        });
      })
    );
  }

  updateTodo(updatedTodo: Partial<Todo>): Observable<Todo> {
    return this.http
      .put<Todo>(`${this.apiUrl}/${updatedTodo._id}`, updatedTodo)
      .pipe(
        tap(() => {
          this.getTodos().subscribe((todos) => {
            this.todosUpdated.next(todos);
          });
        })
      );
  }

  toggleTodoCompleted(todo: Todo): Observable<Todo> {
    todo.completed = !todo.completed;
    return this.updateTodo(todo);
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.getTodos().subscribe((todos) => {
          this.todosUpdated.next(todos);
        });
      })
    );
  }
}
