import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoFormComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: 'todos/new', pathMatch: 'full' },
          { path: 'todos/new', component: TodoFormComponent }
        ]),
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  });

  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
