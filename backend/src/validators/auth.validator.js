const Joi = require("joi");

const registerSchema = Joi.object({
    fullName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .min(6)
        .max(100)
        .required(),

    phone: Joi.string()
        .trim()
        .allow("")
        .optional()
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});

module.exports = {
    registerSchema,
    loginSchema
};