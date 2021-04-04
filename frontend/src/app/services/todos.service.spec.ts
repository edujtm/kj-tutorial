import { TestBed } from '@angular/core/testing';
import { of, MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Todo } from '../models/todo.model';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let todoService: TodosService;
  let httpSpy: any;

  const testTodos: Todo[] = [
    { id: 1, name: "Estudar angular obserables", description: "Bons artigos no indepth.dev", status: false },
    { id: 2, name: "Lavar a louça", description: "Tem um monte", status: false },
  ];

  // Testar metodo getTodos do todoService
  it('deve obter todos da API quando chamar getTodos', () => {

  })

  // Testar metodo de delete do todo
  // retorno da api DELETE /todos/:id
  // {
  //  message: string,
  //  todos: Todo[],
  //  todo: Todo
  // }
  it('deve remover item no estado local após sucesso no DELETE da API de todos', () => {

  })
});

const expectEvents = <T>(items: T[], done: DoneFn): MonoTypeOperatorFunction<T> => {
  let idx = 0;
  return (obs) => obs.pipe(
    tap((item) => {
      expect(item).toEqual(items[idx]);
      idx++;
      if (idx == items.length) {
        done();
      }
    })
  )
}
