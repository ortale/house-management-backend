import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'password',
    database: 'house_management',
});
