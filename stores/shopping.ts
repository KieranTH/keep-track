import type { ShoppingItem, ShoppingList, Task } from "@/database/type";
import { create } from "zustand";

type ShoppingStore = {
	lists: ShoppingList[];
	setLists: (lists: ShoppingList[]) => void;
	addList: (list: ShoppingList) => void;
	removeList: (id: string) => void;
	updateList: (list: ShoppingList) => void;

	items: Map<string, ShoppingItem[]>;
	setItems: (listId: string, items: ShoppingItem[]) => void;
	addItem: (listId: string, item: ShoppingItem) => void;
	removeItem: (listId: string, itemId: string) => void;
	updateItem: (listId: string, item: ShoppingItem) => void;
};

// Define the store
export const useShoppingStore = create<ShoppingStore>((set) => ({
	lists: [],
	setLists: (lists) => set({ lists }),
	addList: (list) => set((state) => ({ lists: [...state.lists, list] })),
	removeList: (id) =>
		set((state) => ({ lists: state.lists.filter((list) => list.id !== id) })),
	updateList: (updatedList) =>
		set((state) => ({
			lists: state.lists.map((list) =>
				list.id === updatedList.id ? updatedList : list,
			),
		})),
	items: new Map(),
	setItems: (listId, items) =>
		set((state) => {
			const newItems = new Map(state.items);
			newItems.set(listId, items);
			return { items: newItems };
		}),
	addItem: (listId, item) =>
		set((state) => {
			const newItems = new Map(state.items);
			const currentItems = newItems.get(listId) || [];
			newItems.set(listId, [...currentItems, item]);
			return { items: newItems };
		}),
	removeItem: (listId, itemId) =>
		set((state) => {
			const newItems = new Map(state.items);
			const currentItems = newItems.get(listId) || [];
			newItems.set(
				listId,
				currentItems.filter((item) => item.id !== itemId),
			);
			return { items: newItems };
		}),
	updateItem: (listId, updatedItem) =>
		set((state) => {
			const newItems = new Map(state.items);
			const currentItems = newItems.get(listId) || [];
			newItems.set(
				listId,
				currentItems.map((item) =>
					item.id === updatedItem.id ? updatedItem : item,
				),
			);
			return { items: newItems };
		}),
}));
