import express from 'express';
import { UserService } from '../services/userService';
import { User } from '../models/user';

const router = express.Router();
const userService = new UserService();

router.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    const response = await userService.login(email, password);

    if (response == null) res.status(404).send('User or password is incorrect')

    else res.status(201).send(response);
});

router.post('/users/create', async (req, res) => {
    const user = req.body as unknown as User;
    const response = await userService.saveUser(user);

    if (response == null) res.status(500).send('Error on trying to register user');

    else res.status(201).send(response);
});

router.post('/users/logout', async (req, res) => {
    const user = req.body as unknown as User;
    const response = await userService.logout(user);

    if (response == null) res.status(500).send('Error on trying to logout user')

    else res.status(201).send('User logged out');
});

export default router;