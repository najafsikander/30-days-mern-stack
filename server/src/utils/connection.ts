import { connect } from "mongoose";
import { info, error } from "./logger";
import { DB_APP, DB_CLUSTER, DB_NAME, DB_PASSWORD, DB_USER } from "./config";

export const openConnection = async () => {

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
        if (!connection) throw 'Error connecting to database';

        info('Connected to database');
    }
    catch (err) {
        error('Error connecting to database: ' + err);
        throw err;
    }
}
