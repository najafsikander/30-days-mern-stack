
import { Request,Response,NextFunction } from "express";
import { ObjectSchema } from "joi";
import { warn } from "../utils/logger";

 const Validator =  (Schema:ObjectSchema) => {
    return async (req:Request,res:Response,next:NextFunction) => {
        try {
            await Schema.validateAsync(req.body);
            next();
        } catch(err:any) {
            warn("Error caught in validator"+err);
            next(err);
        }
    }
 }
export default Validator;