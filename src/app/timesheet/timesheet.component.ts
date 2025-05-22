import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../shared/services/task.service';
import { debounceTime } from 'rxjs';
import { Log } from '../shared/model/log.model';
import { Task } from '../shared/model/task.model';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss',
})
export class TimesheetComponent implements OnInit {
  form!: FormGroup;

  tasks: Task[] = [];
  logs: Log[] = [];
  createdLogs: string[] = [];

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.getLogs();
    this.onValChanges();
  }

  onValChanges() {
    this.form
      ?.get('task')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((val) => {
        this.getTasks(val);
      });
  }

  createForm() {
    this.form = this.fb.group({
      task: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  getLogs() {
    this.taskService.getlogs().subscribe((logs: Log[]) => {
      this.logs = logs.filter((item) => this.createdLogs.includes(item.id));
    });
  }

  getTasks(val: string) {
    this.taskService.getTasks(val).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formData = this.form.getRawValue();
    const payload: Task = {
      task: formData.task,
      start: formData.start,
      end: formData.end,
    };

    this.taskService.addLog(payload).subscribe({
      next: (res: any) => {
        if (res.id) this.createdLogs.push(res.id);

        this.getLogs();

        this.form.reset();
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
