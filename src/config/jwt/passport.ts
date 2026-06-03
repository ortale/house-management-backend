import { UserService } from "../../services/userService";
import * as LocalStrategy from 'passport-local';
import * as jwt from 'passport-jwt';
import { compareSync } from "bcrypt";
import { Security } from './security';
import { User } from "../../models/user";
import passport from "passport";
require('dotenv').config();

export class PassportMiddleWare {

	static async addMiddleWare() {
		let userService = new UserService();

		const localAuthMiddleware = new LocalStrategy.Strategy({
				usernameField: "username"
			},

			async (email, password, done) => {
				try {
					let user = await userService.getByUsername(email) as unknown as User;
					
					if (!user || !compareSync(password, user.password ? user.password : "")) {
						return done({ message: 'Your login details could not be verified. Please try again.', status: 401 }, false);
					}
					
					let token = await Security.generateJWT(user);
					console.log("Token: " + token);
					done(null, token);
				} catch (error) {
					console.log(JSON.stringify(error));
				}
			}
		);

		const jwtMiddleware = new jwt.Strategy({
				jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: process.env.JWT_SECRET
			},

			async (payload, done) => {
				try {
					let userService = new UserService();
					let user = await userService.getById(payload.id);

					console.log("User: " + user);

					if (!user) {
						return done({ message: 'Access denied', status: 401 }, false);
					}

					done(null, user);
				} catch (error) {
					done(error);
				}

			}
		);

		passport.use(localAuthMiddleware);
		passport.use(jwtMiddleware);
	}
}
