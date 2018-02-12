import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as _ from 'lodash';

@Injectable()
export class TodoService {
  public todoListSubject = new ReplaySubject<Todo[]>();
  private todoList: Todo[] = [
    {
      description: 'Drop off letter at the post office.',
      status: 'incomplete',
      date: new Date()
    },
    {
      description: 'Meeting at 3pm.',
      status: 'incomplete',
      date: new Date()
    }
  ];

  getTodoList() {
    this.todoListSubject.next(this.todoList);
  }

  addToList(todo: Todo) {
    this.todoList.push(todo);
    this.todoListSubject.next(this.todoList);
  }

  removeFromList(todo: Todo) {
    const removeIndex = _.findIndex(this.todoList, todo);
    if (removeIndex >= 0) {
      this.todoList.splice(removeIndex, 1);
      this.todoListSubject.next(this.todoList);
    }
  }

  updateTodoStatus(todo: Todo, status: string) {
    const index = _.findIndex(this.todoList, todo);
    // complete this function to update the status;
  }
}
