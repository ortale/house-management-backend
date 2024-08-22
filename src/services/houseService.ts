import { db } from '../config/db';
import { House, Certificate, Payment } from '../models/house';

export class HouseService {
    async getAllHouses(): Promise<House[]> {
        const [rows] = await db.query('SELECT * FROM houses');
        const houses: House[] = [];

        for (const row of rows as any[]) {
            const [certificates] = await db.query('SELECT * FROM certificates WHERE houseId = ?', [row.id]);
            const [payments] = await db.query('SELECT * FROM payments WHERE houseId = ?', [row.id]);

            houses.push({
                id: row.id,
                name: row.name,
                certificates: certificates as Certificate[],
                payments: payments as Payment[],
            });
        }

        return houses;
    }

    async addHouse(house: Omit<House, 'id'>): Promise<void> {
        const result = await db.query('INSERT INTO houses (name) VALUES (?)', [house.name]);
    }

    async updateHouse(house: House): Promise<void> {
        await db.query('UPDATE houses SET name = ? WHERE id = ?', [house.name, house.id]);
    }

    async deleteHouse(id: number): Promise<void> {
        await db.query('DELETE FROM houses WHERE id = ?', [id]);
    }
}
