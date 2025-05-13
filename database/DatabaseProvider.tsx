import Fallback from "@/components/Fallback";
import { type SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";

async function migrateDbIfNeeded(db: SQLiteDatabase) {
	const DATABASE_VERSION = 1;
	const user_version = await db.getFirstAsync<{ user_version: number }>(
		"PRAGMA user_version",
	);
	let currentDbVersion = user_version?.user_version ?? 0;
	if (currentDbVersion >= DATABASE_VERSION) {
		return;
	}
	console.log("RUNNING MIGRATIONS");
	if (currentDbVersion === 0) {
		await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, colour TEXT DEFAULT NULL);
    `);
		await db.execAsync(`
      CREATE TABLE tasks (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0
      );
    `);
		currentDbVersion = 1;
	}
	// if (currentDbVersion === 1) {
	//   Add more migrations
	// }
	await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
}

type DatabaseProviderType = {
	children: React.ReactNode;
};
const DatabaseProvider = ({ children }: DatabaseProviderType) => {
	return (
		<Suspense fallback={<Fallback />}>
			<SQLiteProvider databaseName="db" onInit={migrateDbIfNeeded} useSuspense>
				{children}
			</SQLiteProvider>
		</Suspense>
	);
};

export default DatabaseProvider;
