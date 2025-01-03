import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Task, User } from "./type";
import { randomUUID } from "expo-crypto";

export const useUser = () => {
  const db = useSQLiteContext();

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function init() {
      const result = await db.getAllAsync<User>("SELECT * FROM users");
      if (result.length) {
        setUser(result[0]);
      } else [setUser(null)];
    }
    init();
  }, []);

  const addUser = async (name: string) => {
    await db.runAsync("INSERT INTO users (name) VALUES (?)", name);
  };

  return {
    user,
    addUser,
  };
};

type GetTasksProps = {
  limit?: number;
};
export const useGetTasks = ({ limit }: GetTasksProps) => {
  const db = useSQLiteContext();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function init() {
      if (limit) {
        const result = await db.getAllAsync<Task>(
          "SELECT * FROM tasks LIMIT ?",
          limit
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

export const useTasks = () => {
  const db = useSQLiteContext();

  const addTask = async (task: Omit<Task, "id">) => {
    await db.runAsync(
      "INSERT INTO tasks (id, title, description) VALUES (?, ?, ?)",
      randomUUID(),
      task.title,
      task.description ?? null
    );
  };

  return {
    addTask,
  };
};
