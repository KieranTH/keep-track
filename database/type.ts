export type User = {
  id: number;
  name: string;
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed?: number;
};
