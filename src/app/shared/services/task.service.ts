import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../model/log.model';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseURL = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  getTasks(taskName?: string): Observable<Task[]> {
    const path = taskName
      ? `${this.baseURL}/tasktype?name=${taskName}`
      : `${this.baseURL}/tasktype`;

    return this.httpClient.get<Task[]>(path);
  }

  getlogs(): Observable<Log[]> {
    return this.httpClient.get<Log[]>(`${this.baseURL}/log`);
  }

  addLog(data: Task) {
    return this.httpClient.post(`${this.baseURL}/log`, data);
  }
}
