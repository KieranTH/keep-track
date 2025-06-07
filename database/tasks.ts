import { useTaskStore } from "@/stores/tasks";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import type { Task } from "./type";
import { randomUUID } from "expo-crypto";

type TasksProps = {
	limit?: number;
};
export const useTasks = ({ limit }: TasksProps) => {
	const db = useSQLiteContext();

	const tasks = useTaskStore((state) => state.tasks);
	const setTasks = useTaskStore((state) => state.setTasks);

	useEffect(() => {
		async function init() {
			if (limit) {
				const result = await db.getAllAsync<Task>(
					"SELECT * FROM tasks LIMIT ?",
					limit,
				);
				setTasks(result);
			} else {
				const result = await db.getAllAsync<Task>("SELECT * FROM tasks");
				setTasks(result);
			}
		}
		init();
	}, []);

	return {
		tasks,
	};
};

export const useTaskFunctions = () => {
	const db = useSQLiteContext();
	const addTask = async (task: Omit<Task, "id">) => {
		const addTaskStore = useTaskStore.getState().addTask;
		const resp = await db.runAsync(
			"INSERT INTO tasks (id, title, description) VALUES (?, ?, ?)",
			randomUUID(),
			task.title,
			task.description ?? null,
		);
		if (resp.changes > 0) {
			const newTask: Task = {
				id: resp.lastInsertRowId,
				title: task.title,
				description: task.description,
			};
			addTaskStore(newTask);
			return newTask;
		}
	};

	return {
		addTask,
	};
};
