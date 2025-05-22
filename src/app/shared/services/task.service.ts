import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskLog } from '../model/log.model';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseURL = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  getTasks(taskName: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(
      `${this.baseURL}/tasktype?name=${taskName}`
    );
  }

  getLogs(): Observable<TaskLog[]> {
    return this.httpClient.get<TaskLog[]>(`${this.baseURL}/log`);
  }

  addLog(data: Task): Observable<{ id: string }> {
    return this.httpClient.post<{ id: string }>(`${this.baseURL}/log`, data);
  }
}
