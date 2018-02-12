import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  public todoList: Todo[] = [];
  public numberOfActive = 0;
  private todoListSubscription: Subscription = new Subscription;
  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit() {
    // what is wrong with this code?
    this.todoService.getTodoList();
    this.todoListSubscription = this.todoService.todoListSubject.subscribe((todoList: Todo[]) => {
      this.todoList = todoList;
      this.todoList.forEach(todo => {
        if (todo.status === 'incomplete') {
          this.numberOfActive++;
        }
      });
    });
  }

  ngOnDestroy() {
    this.todoListSubscription.unsubscribe();
  }

  add(event) {
    const description: string = event.target.value;
    const todo: Todo = {
      description,
      status: 'incomplete',
      date: new Date()
    };
    this.todoService.addToList(todo);
  }

  remove(index: number) {
    this.todoService.removeFromList(this.todoList[index]);
  }

  markComplete() {
    // complete the code
  }
}
