import joi from "joi";

const saveEditUserSchema = joi.object({
    user: joi.object({
        email: joi.string().email().required(),
        firstName: joi.string().required(),
        lastName: joi.string().required()
    })
});

export {saveEditUserSchema};