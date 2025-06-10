import {Pool} from 'pg'

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'inventory',
    port: 5432
})

export default pool;