import joi from "joi";

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

const registerSchema = joi.object({
    user: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        firstName: joi.string().required(),
        lastName: joi.string().required()
    })
});

const changePassSchema = joi.object({
    oldPassword: joi.string().min(6).required(),
    newPassword: joi.string().min(6).required()
});

const resetPassSchema = joi.object({
    email: joi.string().email().required()
});

export {loginSchema, registerSchema, changePassSchema, resetPassSchema};