import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MonoTypeOperatorFunction, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Todo } from '../../models/todo.model';
import { TodoListComponent } from './todo-list.component';
import { TodosService } from '../../services/todos.service';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let todoServiceSpy: any;

  const testTodos: Todo[] = [
    { id: 1, name: "Estudar angular obserables", description: "Bons artigos no indepth.dev", status: false },
    { id: 2, name: "Lavar a louça", description: "Tem um monte", status: true },
  ];

  beforeEach(async () => {
    todoServiceSpy = jasmine.createSpyObj('TodosService', ['todos$', 'getTodos']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        TodoListComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    component = TestBed.inject(TodoListComponent);
  })

  it('deve mostrar todos os to-dos caso um filtro não seja especificado', () => {
  });

  it('deve mostrar apenas os to-dos completos quando o filtro for igual a true', () => {

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
