import type { Reminder } from "@/database/type";
import { create } from "zustand";

type ReminderStore = {
	reminders: Reminder[];
	setReminders: (reminders: Reminder[]) => void;
	addReminder: (reminder: Reminder) => void;
	removeReminder: (id: number) => void;
	updateReminder: (id: number, updated: Partial<Reminder>) => void;
};

// Define the store
export const useReminderStore = create<ReminderStore>((set) => ({
	reminders: [],
	setReminders: (reminders) => set({ reminders }),
	addReminder: (reminder) =>
		set((state) => ({
			reminders: [...state.reminders, reminder],
		})),
	removeReminder: (id) =>
		set((state) => ({
			reminders: state.reminders.filter((reminder) => reminder.id !== id),
		})),
	updateReminder: (id, updated) =>
		set((state) => ({
			reminders: state.reminders.map((reminder) =>
				reminder.id === id ? { ...reminder, ...updated } : reminder,
			),
		})),
}));
