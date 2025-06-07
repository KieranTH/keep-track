export type User = {
	id: number;
	name: string;
	colour?: string;
};

export type Task = {
	id: number;
	title: string;
	description?: string;
	completed?: number;
};

export type Reminder = {
	id: number;
	title: string;
	description?: string;
	completed?: number;
	createdAt: string; // ISO date string
	reminderDate?: string; // ISO date string
	reminderInterval?: number; // in seconds
};

export type ShoppingList = {
	id: string;
	title: string;
	description?: string;
	completed?: number;
	createdAt: string; // ISO date string
};

export type ShoppingItem = {
	id: string;
	name: string;
	quantity?: number;
	description?: string;
	completed?: number;
	createdAt: string; // ISO date string
	listId: string; // Foreign key to ShoppingList
};
