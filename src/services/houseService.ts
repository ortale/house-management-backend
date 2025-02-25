import { db } from '../config/db';
import { House, Certificate, Payment } from '../models/house';

export class HouseService {
    async getAllHouses(): Promise<House[]> {
        const [rows] = await db.query('SELECT id, name, email, rentAmount, rentDate, feePercent, DATE_ADD(astExpDate, INTERVAL 1 DAY) AS astExpDate FROM houses');
        const houses: House[] = [];

        for (const row of rows as any[]) {
            const [certificates] = await db.query('SELECT * FROM certificates WHERE houseId = ?', [row.id]);
            const [payments] = await db.query('SELECT * FROM payments WHERE houseId = ?', [row.id]);

            houses.push({
                id: row.id,
                name: row.name,
                email: row.email,
                rentAmount: row.rentAmount,
                feePercent: row.feePercent,
                astExpDate: row.astExpDate,
                rentDate: row.rentDate,
                certificates: certificates as Certificate[],
                payments: payments as Payment[],
            });
        }

        return houses;
    }

    async addHouse(house: Omit<House, 'id'>): Promise<void> {
        console.log('INSERT INTO houses (name) VALUES (?, ?, ?)', [house.name, house.email, house.rentAmount, house.astExpDate]);
        const result = await db.query('INSERT INTO houses (name, email, rentAmount, rentDate, feePercent, astExpDate) VALUES (?, ?, ?)', [house.name, house.email, house.rentAmount, house.astExpDate]);
    }

    async updateHouse(house: House): Promise<void> {
        await db.query('UPDATE houses SET name = ?, email = ?, rentAmount = ?, feePercent = ?, rentDate = ?, astExpDate = ? WHERE id = ?', [house.name, house.email, house.rentAmount, house.feePercent, house.rentDate, house.astExpDate, house.id]);
    }

    async deleteHouse(id: number): Promise<void> {
        await db.query('DELETE FROM houses WHERE id = ?', [id]);
    }
}
