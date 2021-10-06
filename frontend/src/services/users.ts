import axios from 'axios';
import { NewUser, User } from '../types';

const baseUrl = 'http://localhost:3001/api/users';

const createUser = async (user: NewUser) => {
    const res = await axios.post<User>(baseUrl, user);
    return res.data;
}

export default { createUser };