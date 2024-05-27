import { HomeComponent } from './home/home.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Todo List',
  },
  {
    path: 'details/:id',
    component: TodoItemComponent,
    title: 'Todo Item Details',
  },
];
