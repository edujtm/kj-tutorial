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

  getTodos() {
    this.http.get<{ todos: Todo[] }>(`${environment.backendApi}/todos/`)
      .subscribe((res) => {
        this.update({
          todos: [...res.todos]
        });
      })
  }
}
