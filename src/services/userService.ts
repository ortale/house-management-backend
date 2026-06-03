import { db } from '../config/db';
import { Security } from '../config/jwt/security';
import { User } from '../models/user';

export class UserService {
    async login(email: string, password: string): Promise<User | null> {
        const userFound = await this.getByUsername(email) as unknown as [unknown];
		const userFoundObj = userFound[0] as User;
        
		if (userFoundObj == null) {
			return null;
		}

		const isValidPassword = await Security.isValidPassword(password, userFoundObj.password ? userFoundObj.password : "") ? userFoundObj : null;

		if (isValidPassword == null) {
			return null;
		}

		const loggedUser = await Security.generateJWT(userFoundObj) as unknown as User;

		await this.updateUser(loggedUser);

		const userResponse = await this.getByUsername(email) as unknown as [unknown];

		return userResponse[0] as User;
    }

    async getByUsername(email: string): Promise<User | null> {
		const user = await db.query('SELECT * FROM users WHERE email = ?', [email]) as unknown as [unknown]

		return user[0] as User;
    }

    async getByUsernameToUser(email: string): Promise<User | null> {
		const user = await db.query('SELECT id, email, fullName, token FROM users WHERE email = ?', [email]) as unknown as [unknown]

		return user[0] as User;
    }

    async getById(id: number): Promise<User | null> {
		return await db.query('SELECT * FROM users WHERE id = ?', [id]) as unknown as User;
    }

    async saveUser(user: User): Promise<User | null> {
		const hash = await Security.hashPassword(user.password ? user.password : "");
		user.password = hash;

		const loggedUser = await Security.generateJWT(user) as unknown as User;

        await db.query(
            'INSERT INTO users (fullName, email, password, token) VALUES (?, ?, ?, ?)', 
            [
                loggedUser.fullName,
                loggedUser.email,
                user.password,
                loggedUser.token
            ]
        );

		const updatedUser = await this.getByUsernameToUser(loggedUser.email ? loggedUser.email : "")

		return updatedUser;
    }

	private async updateUser(user: User) {
		await db.query(
			'UPDATE users SET token = ? WHERE id = ?', 
			[user.token, user.id]
		);
	}

	public async logout(user: User) {
		await db.query(
			'UPDATE users SET token = ? WHERE id = ?', 
			[null, user.id]
		);
	}
}