import Fallback from "@/components/Fallback";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let user_version = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  let currentDbVersion = user_version?.user_version ?? 0;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);
        CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    `);
    await db.runAsync(
      "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      "hello",
      1
    );
    await db.runAsync(
      "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      "world",
      2
    );
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
