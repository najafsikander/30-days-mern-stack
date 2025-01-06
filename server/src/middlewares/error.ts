import { Request, Response, NextFunction } from "express";

const reportError = (err: any, req: Request, res: Response, next: NextFunction) =>{
    
    res.status(500).json({message: 'Internal server error caught by middleware', error: err.message});
}


export default reportError;