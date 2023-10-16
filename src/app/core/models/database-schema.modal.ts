import { DBConfig } from "ngx-indexed-db";

export const DB_SCHEMA: DBConfig = {
  name: 'configable',
  version: 1,
  objectStoresMeta: [
    {
      store: 'config',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'content', keypath: 'content', options: { unique: false } },
      ]
    }
  ]
};

export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db, transaction) => {
      // noop
    }
  };
}
  