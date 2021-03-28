import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';
import { Store } from '../utils/store';

interface TodosState {
  todos: Todo[]
};

const INITIAL_STATE = {
  todos: [
    { name: 'teste', description: 'descricao do todo', status: false, id: 1 },
    { name: 'outro teste', description: 'descricao do todo', status: false, id: 2 },
    { name: 'Lavar louça', description: 'Muita louça', status: true, id: 3 }
  ],
};

type TodoApiResponse = {
  message: string;
  todo: Todo;
  todos: Todo[];
}

@Injectable({
  providedIn: 'root'
})
export class TodosService extends Store<TodosState> {
  todos$ = this.select(state => state.todos);

  constructor(
    private http: HttpClient
  ) { 
    super(INITIAL_STATE);
  }

  getTodos(): void {
    this.http.get<{ todos: Todo[] }>(`${environment.backendApi}/todos/`)
      .subscribe((res) => {
        this.update({
          todos: [...res.todos]
        });
      })
  }

  createTodo(data: Omit<Todo, 'id'>) {
    this.http.post<TodoApiResponse>(`${environment.backendApi}/todos`, data)
      .subscribe((res) => {
        this.update(state => {
          return { todos: [...state.todos, res.todo] };
        })
      })
  }

  updateTodo(todoId: number, data: Omit<Todo, 'id'>) {
    this.http.put<TodoApiResponse>(`${environment.backendApi}/todos/${todoId}`, data)
      .subscribe((res) => {
        this.update(state => {
          const currentTodos = state.todos.filter(todo => todo.id !== res.todo.id);
          return { todos: [...currentTodos, res.todo] };
        });
      });
  }

  deleteTodo(todoId: number): void {
    this.http.delete<TodoApiResponse>(`${environment.backendApi}/todos/${todoId}`)
      .subscribe(() => {
        this.update(state => {
          const todos = [...state.todos.filter(todo => todo.id !== todoId)];
          return { todos };
        })
      });
  }

  getTodo(todoId: number): Todo {
    return this.state.todos.find(todo => todo.id === todoId);
  }
}
