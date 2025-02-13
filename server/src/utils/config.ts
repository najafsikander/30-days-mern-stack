import dotenv from 'dotenv';
dotenv.config();

export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_CLUSTER = process.env.DB_CLUSTER;
export const DB_APP = process.env.DB_APP;
export const DB_NAME = process.env.DB_NAME;
export const SALT_ROUND = process.env.SALT_ROUND;
export const SECRET = process.env.SECRET;
export const MAIL_AUTH_USER = process.env.MAIL_AUTH_USER;
export const MAIL_AUTH_PASS = process.env.MAIL_AUTH_PASS;
export const MAIL_SENDER = process.env.MAIL_SENDER;
