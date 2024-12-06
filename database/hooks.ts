import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { User } from "./type";

export const useUser = () => {
  const db = useSQLiteContext();

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function init() {
      const result = await db.getAllAsync<User>("SELECT * FROM users");
      console.log("result", result);
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
