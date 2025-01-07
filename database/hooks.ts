import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Task, User } from "./type";
import { randomUUID } from "expo-crypto";

export const useUserDB = () => {
  const db = useSQLiteContext();

  const fetchUser = async () => {
    const result = await db.getAllAsync<User>("SELECT * FROM users");
    return result;
  };

  const addUser = async (name: string, colour?: string) => {
    await db.runAsync(
      "INSERT INTO users (name, colour) VALUES (?, ?)",
      name,
      colour ?? null
    );
    return fetchUser();
  };

  const updateUser = async (id: number, name: string, colour?: string) => {
    await db.runAsync(
      "UPDATE users SET name = ?, colour = ? WHERE id = ?",
      name,
      colour ?? null,
      id
    );
    return fetchUser();
  };

  return {
    addUser,
    fetchUser,
    updateUser,
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
