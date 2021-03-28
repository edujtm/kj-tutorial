import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Todo } from '../../models/todo.model';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  todoFilter: FormControl;

  constructor(
    private todosService: TodosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.todosService.getTodos();
    this.todoFilter = this.fb.control(null);

    this.todos$ = combineLatest([
      this.todosService.todos$,
      this.todoFilter.valueChanges.pipe(startWith(this.todoFilter.value))
    ]).pipe(
      map(([todos, todoFilter]) => {
        return todos.filter(todo => todo.status === todoFilter)
      }));
  }
}
