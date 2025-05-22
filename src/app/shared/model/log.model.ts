export interface TaskDetails {
  createdAt: string;
  name: string;
  id: string;
}

export interface TaskLog {
  taskId: number;
  start: string;
  end: string;
  taskName: string;
  task: TaskDetails;
  id: string;
}
