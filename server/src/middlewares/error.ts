import { Request, Response, NextFunction } from "express";
import {error} from '../utils/logger';

const reportError = (err: any, req: Request, res: Response, next: NextFunction) =>{
    error('Error in global middleware:' + err);
    res.status(500).json({message: 'Internal server error caught by middleware', error: err.message});
}


export default reportError;