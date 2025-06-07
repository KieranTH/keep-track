import { useTaskStore } from "@/stores/tasks";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import type { Reminder, Task } from "./type";
import { randomUUID } from "expo-crypto";
import { useReminderStore } from "@/stores/reminders";

type RemindersProps = {
	limit?: number;
};
export const useReminders = ({ limit }: RemindersProps) => {
	const db = useSQLiteContext();

	const reminders = useReminderStore((state) => state.reminders);
	const setReminders = useReminderStore((state) => state.setReminders);

	useEffect(() => {
		async function init() {
			if (limit) {
				const result = await db.getAllAsync<Reminder>(
					"SELECT * FROM reminders LIMIT ?",
					limit,
				);
				setReminders(result);
			} else {
				const result = await db.getAllAsync<Reminder>(
					"SELECT * FROM reminders",
				);
				setReminders(result);
			}
		}
		init();
	}, []);

	return {
		reminders,
	};
};

export const useReminderFunctions = () => {
	const db = useSQLiteContext();
	const addReminder = async (reminder: Omit<Reminder, "id" | "createdAt">) => {
		const addReminderStore = useReminderStore.getState().addReminder;
		const now = new Date();
		const resp = await db.runAsync(
			"INSERT INTO reminders (id, title, description, createdAt) VALUES (?, ?, ?, ?)",
			randomUUID(),
			reminder.title,
			reminder.description ?? null,
			now.toISOString(),
		);
		if (resp.changes > 0) {
			const newReminder: Reminder = {
				id: resp.lastInsertRowId,
				...reminder,
				createdAt: now.toISOString(),
			};
			addReminderStore(newReminder);
			return newReminder;
		}
	};

	return {
		addReminder,
	};
};
