import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Todo } from '../models/todo.model';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let todosService: TodosService;
  let httpSpy: any;

  const testTodos: Todo[] = [
    { id: 1, name: "Estudar angular obserables", description: "Bons artigos no indepth.dev", status: false },
    { id: 2, name: "Lavar a louça", description: "Tem um monte", status: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TodosService
      ]
    })
  })

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);

    // SUT
    todosService = new TodosService(httpSpy);
  })

  // Testar metodo getTodos do todoService
  it('deve obter todos da API quando chamar getTodos', (done) => {
    // Given: a api retorna 2 itens de to-dos
    httpSpy.get.and.returnValue(of({ todos: testTodos }));


    todosService.todos$
      .pipe(
        // Then: recebe-se dois eventos com o estado inicial e os itens da API
        expectEvents([
          [],           // Estado Inicial
          testTodos     // Resposta da API
        ], done)
      )
      .subscribe()

    // When: chama-se o metodo getTodos
    todosService.getTodos();
  })

  it('deve obter to-dos da API quando chamar getTodos (HttpClientTestingModule)', (done) => {
    // System Under Test (SUT)
    const todosService = TestBed.inject(TodosService); 
    const httpMock = TestBed.inject(HttpTestingController);

    todosService.todos$
      .pipe(
        expectEvents([
          [],           // Estado Inicial
          testTodos     // Resposta da API
        ], done)
      )
      .subscribe()

    // When: chama-se o metodo getTodos
    todosService.getTodos();

    const req = httpMock.expectOne('http://localhost:4000/todos/');
    expect(req.request.method).toEqual('GET');
    req.flush({ todos: testTodos });
  })

  // Testar metodo de delete do todo
  // retorno da api DELETE /todos/:id
  // {
  //  message: string,
  //  todos: Todo[],
  //  todo: Todo
  // }
  it('deve remover item no estado local após sucesso no DELETE da API de todos', (done) => {
    httpSpy.delete.and.returnValue(of({}))

    // Given: já foram obtido os todos da API.
    httpSpy.get.and.returnValue(of({ todos: testTodos }));
    todosService.getTodos();

    // When: deleta-se um todo
    todosService.deleteTodo(testTodos[0].id);
  })

  // Testar metodo de update do todo
  // retorno da api UPDATE /todos/:id
  // {
  //  message: string,
  //  todos: Todo[],
  //  todo: Todo
  // }
  it('deve atualizar item no estado local após sucesso no PUT da API de todos', (done) => {
    // Given: há um update na API
    httpSpy.put.and.callFake((endpoint, data) => {
      return of({ todo: { ...testTodos[1], ...data } })
    });

    // Given: os dados já foram obtidos do backend
    httpSpy.get.and.returnValue(of({ todos: testTodos }));
    todosService.getTodos();

    const novaDescricao = "Acumulou a louça do almoço"
    const updatedTodo = { ...testTodos[1], description: novaDescricao };
    const updatedTodos = [ testTodos[0], updatedTodo];

    todosService.todos$
      .pipe(
        expectEvents([
          testTodos,
          updatedTodos     // Resposta da API
        ], done)
      )
      .subscribe()

    todosService.updateTodo(2, updatedTodo);
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
