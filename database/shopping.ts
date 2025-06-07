import { useTaskStore } from "@/stores/tasks";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import type { ShoppingList, Task } from "./type";
import { randomUUID } from "expo-crypto";
import { useShoppingStore } from "@/stores/shopping";

type ShoppingProps = {
	limit?: number;
};
export const useShopping = ({ limit }: ShoppingProps) => {
	const db = useSQLiteContext();

	const lists = useShoppingStore((state) => state.lists);
	const setShoppingList = useShoppingStore((state) => state.setLists);

	useEffect(() => {
		async function init() {
			if (limit) {
				const result = await db.getAllAsync<ShoppingList>(
					"SELECT * FROM shoppingList LIMIT ?",
					limit,
				);
				setShoppingList(result);
			} else {
				const result = await db.getAllAsync<ShoppingList>(
					"SELECT * FROM shoppingList",
				);
				setShoppingList(result);
			}
		}
		init();
	}, []);

	return {
		lists,
	};
};

export const useShoppingFunctions = () => {
	const db = useSQLiteContext();
	const addShoppingList = async (list: Omit<ShoppingList, "id">) => {
		const addList = useShoppingStore.getState().addList;
		const resp = await db.runAsync(
			"INSERT INTO shoppingList (id, title, description) VALUES (?, ?, ?)",
			randomUUID(),
			list.title,
			list.description ?? null,
		);
		if (resp.changes > 0) {
			const newList: ShoppingList = {
				id: resp.lastInsertRowId.toString(),
				...list,
			};
			addList(newList);
			return newList;
		}
	};

	return {
		addShoppingList,
	};
};
