import dotenv from 'dotenv';
import { parseStringValue } from './parseValues';
dotenv.config();

const PORT = parseStringValue(process.env.PORT, 'port');
const MONGODB_URI = parseStringValue(process.env.MONGODB_URI, 'mongodb uri');
const SECRET = parseStringValue(process.env.SECRET, 'secret');

export const config = {
    PORT,
    MONGODB_URI,
    SECRET
};