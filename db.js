import path from 'path'
import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'

    const file = path.resolve('./dbjson.json')
	const adapter = new JSONFile(file)
	const db = new Low(adapter, {users: []})

	await db.read() 

export default db