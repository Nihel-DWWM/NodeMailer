import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
export const db = new Low(adapter);

// Initialisation si vide
await db.read();
db.data ||= { users: [], resetTokens: [] };
await db.write();
