import {Response,NextFunction} from "express";
import { AuthenticatedRequest } from "../utils/intefaces.js";
import { roles } from "../data/roles.js";
import { log } from "../utils/logger.js";
export const checkRole = (allowedRoles:string[], action:string) => {
    return (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
        log('Role: ' + req.role);
        if(req.role) {
            const userRole:string = req.role;
            log('Roles: ' + userRole + allowedRoles);
            if(!allowedRoles.includes(userRole)) return next(new Error('Invalid role'));
            const fetchRole = roles.find(r => r.role === userRole);
            if(!fetchRole) return next(new Error('Role does not exist'));

            const permissions = fetchRole?.can.includes(action);
            if(!permissions) return next(new Error('Permissions does not exist'));

            next();
        }
        
    }
}