import express from 'express';
import userService from '../services/userService';
import bcrypt from 'bcrypt';
import { toNewUser } from '../utils';
const router = express.Router();

router.post('/', async (req, res) => {
    console.log("HELLO");
    const newUser = toNewUser(req.body);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

    newUser.password = passwordHash;
    const user = await userService.addUser(newUser);
    //if(!user)
    //    res.status(404).json({ error: "something went wrong" });
    res.json(user);
});

export default router;