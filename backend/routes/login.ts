import express from 'express';
import bcrypt from 'bcrypt';
import userService from '../services/userService';
import { validateCredentials } from '../utils';
import jwt from 'jsonwebtoken';
import { config } from '../utils';
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = validateCredentials(req.body);
    const user = await userService.findByUsername(username);

    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

    if(!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }   

    const userForToken = {
        username: user.username,
        id: user._id,
    }
    
    const token = jwt.sign(userForToken, config.SECRET)
    
    return res.status(200).send({ token, username: user.username, name: user.name, id: user._id })
})

export default router;