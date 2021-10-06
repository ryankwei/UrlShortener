import axios from 'axios';
import { Credentials, Token } from '../types';
const baseUrl = 'http://localhost:3001/api/login';

const login = async (credentials: Credentials) => {
    const res = await axios.post<Token>(baseUrl, credentials);
    return res.data;
}

export default { login };