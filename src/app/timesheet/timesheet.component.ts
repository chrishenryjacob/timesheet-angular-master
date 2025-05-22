import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../shared/services/task.service';
import { TaskLog } from '../shared/model/log.model';
import { Task } from '../shared/model/task.model';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss',
})
export class TimesheetComponent implements OnInit {
  form: FormGroup = this.createForm();
  tasks: Task[] = [];
  logs: TaskLog[] = [];
  createdLogs: string[] = [];

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getLogs();
  }

  createForm() {
    return this.fb.group({
      task: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  searchTask(event: { query: string }) {
    const query = event.query?.trim();
    if (query) {
      this.getTasks(query);
    } else {
      this.tasks = [];
    }
  }

  getTasks(query: string) {
    this.taskService.getTasks(query).subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.tasks = [];
      },
    });
  }

  getLogs() {
    this.taskService.getLogs().subscribe({
      next: (logs: TaskLog[]) => {
        this.logs = logs.filter((log) => this.createdLogs.includes(log.id));
      },
      error: (error) => {
        console.error('Error fetching logs:', error);
        this.logs = [];
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.taskService.addLog(this.form.value).subscribe({
      next: (res: { id: string }) => {
        if (res.id) {
          this.createdLogs.push(res.id);
          this.getLogs();
          this.form.reset();
        }
      },
      error: (error) => {
        console.error('Error adding log:', error);
      },
    });
  }
}
