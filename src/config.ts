import 'dotenv/config';

export const PORT = process.env.PORT as string;

export const MYSQL_HOST = process.env.MYSQL_HOST as string;
export const MYSQL_PORT = process.env.MYSQL_PORT as string;
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE as string;
export const MYSQL_USER = process.env.MYSQL_USER as string;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD as string;

export const API_KEY = process.env.API_KEY as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
