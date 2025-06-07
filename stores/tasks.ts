import type { Task } from "@/database/type";
import { create } from "zustand";

type TaskStore = {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
	addTask: (task: Task) => void;
	removeTask: (taskId: number) => void;
	updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
};

// Define the store
export const useTaskStore = create<TaskStore>((set) => ({
	tasks: [],
	setTasks: (tasks) => set({ tasks }),
	addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
	removeTask: (taskId) =>
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== taskId),
		})),
	updateTask: (taskId, updatedTask) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId ? { ...task, ...updatedTask } : task,
			),
		})),
}));
