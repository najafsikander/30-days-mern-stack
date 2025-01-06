import { connect } from "mongoose";
import {info,error} from "./logger";


export const openConnection = async () => {


    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_CLUSTER = process.env.DB_CLUSTER;
    const DB_APP = process.env.DB_APP;
    const DB_NAME = process.env.DB_NAME;

    const mongoURL: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/?retryWrites=true&w=majority&appName=${DB_APP}`;
    
    try {
        const connection = await connect(mongoURL, {
            dbName: DB_NAME,
            user: DB_USER,
            pass: DB_PASSWORD,
            autoCreate: true,
            autoIndex: true,
            sanitizeFilter: true
        });
        if(!connection) throw 'Error connecting to database';

        info('Connected to database');
    }
    catch (err) {
        error('Error connecting to database: '+ err);
        throw err;
    }
}