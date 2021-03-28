import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { IntRouteConstraint } from './utils/int-route-constraint.guard';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/new', component: TodoFormComponent },
  { path: 'todos/:id', component: TodoFormComponent, canActivate: [IntRouteConstraint]},
];

@NgModule({
  providers: [
    IntRouteConstraint
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
