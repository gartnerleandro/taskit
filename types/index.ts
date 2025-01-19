export type Todo = {
  id: string;
  title: string;
  description?: string;
  endDate?: string;
  completed: boolean;
  completedAt?: string;
}