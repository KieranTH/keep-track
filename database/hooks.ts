import { useSQLiteContext } from "expo-sqlite";
import type { User } from "./type";

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
			colour ?? null,
		);
		return fetchUser();
	};

	const updateUser = async (id: number, name: string, colour?: string) => {
		await db.runAsync(
			"UPDATE users SET name = ?, colour = ? WHERE id = ?",
			name,
			colour ?? null,
			id,
		);
		return fetchUser();
	};

	return {
		addUser,
		fetchUser,
		updateUser,
	};
};
