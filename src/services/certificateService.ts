import { db } from '../config/db';
import { Certificate } from '../models/certificate';

export class CertificateService {
    async getAllCertificates(): Promise<Certificate[]> {
        const [rows] = await db.query('SELECT * FROM certificates');
        const certificateList: Certificate[] = [];

        for (const row of rows as any[]) {
            const [certificates] = await db.query('SELECT * FROM certificates');    

            certificateList.push({
                id: row.id,
                name: row.name,
                houseId: 1,
                date: new Date(),
                expireDate: new Date()
            });
        }

        return certificateList;
    }

    async addCertificate(certificate: Omit<Certificate, 'id'>): Promise<void> {
        await db.query('INSERT INTO certificates (houseId, name, date, expireDate) VALUES (?, ?, ?, ?)', [
            certificate.houseId,
            certificate.name,
            certificate.date,
            certificate.expireDate,
        ]);
    }

    async updateCertificate(certificate: Certificate): Promise<void> {
        await db.query('UPDATE certificates SET name = ?, date = ?, expireDate = ? WHERE id = ?', [
            certificate.name,
            certificate.date,
            certificate.expireDate,
            certificate.id,
        ]);
    }

    async deleteCertificate(id: number): Promise<void> {
        await db.query('DELETE FROM certificates WHERE id = ?', [id]);
    }
}
