import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { TodosService } from '../../services/todos.service';

type CreateForm = {
  type: "create"
}

type UpdateForm = {
  type: "update"
  itemId: number;
}

type FormType =
  | CreateForm
  | UpdateForm;

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;
  formType: FormType = { type: "create" };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodosService,
    private fb: FormBuilder
  ) { 
    this.todoForm = this.fb.group({
      name: this.fb.control('', Validators.required), 
      description: this.fb.control('', Validators.required),
      status: this.fb.control(false, Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.url
      .pipe(
        map((segment) => {
          if (segment[1].path === "new") {
            return null;
          }
          return segment[1].path;
        })
      )
      .subscribe((id: string | null) => {
        if (id !== null) {
          const itemId = parseInt(id);
          this.formType = {
            type: "update",
            itemId
          };

          const todo = this.todoService.getTodo(itemId);
          this.todoForm.reset({ ...todo })
        }
      });
  }

  submitTodo() {
    if (this.todoForm.valid) {
      if (this.formType.type === "create") {
        this.todoService.createTodo(this.todoForm.value);

      } else if (this.formType.type === "update") {
        const { itemId } = this.formType;
        const formData = this.todoForm.value;
        this.todoService.updateTodo(itemId, formData);
      }

      this.router.navigate(['../']);
    }
  }


}
