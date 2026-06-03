import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';
import passport = require('passport');
import { NextFunction, Request, Response } from "express";
import { User } from '../../models/user';

require('dotenv').config();

export class Security {

	static async hashPassword(password: string) {
		return bcrypt.hashSync(password, 10);
	}

	static async isValidPassword(typedPassword: string, storedPassword: string): Promise<boolean> {
		return await bcrypt.compare(typedPassword, storedPassword);
	}

	static async generateJWT(user: any) {
		var token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				expiresIn: process.env.JWT_TOKEN_EXPIRES
			},
			process.env.JWT_SECRET || '4578226596633'
		);
		
		return {
			id: user.id,
			fullName: user.fullName,
			email: user.email,
			token: token
		};
	};

}

export const Authorize = passport.authenticate('jwt', { session: false });

export const AuthorizeLocal = passport.authenticate('local', { session: false });
