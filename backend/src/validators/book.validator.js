const Joi = require("joi");

const createBookSchema = Joi.object({

    title: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required(),

    author: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required(),

    isbn: Joi.string()
        .trim()
        .min(10)
        .max(20)
        .required(),

    category: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required(),

    publisher: Joi.string()
        .trim()
        .max(255)
        .allow("")
        .optional(),

    publishedYear: Joi.number()
        .integer()
        .min(1000)
        .max(new Date().getFullYear())
        .optional(),

    quantity: Joi.number()
        .integer()
        .min(0)
        .required(),

    description: Joi.string()
        .allow("")
        .optional(),

    coverImage: Joi.string()
        .uri()
        .allow("")
        .optional()
});

const updateBookSchema = Joi.object({

    title: Joi.string()
        .trim()
        .min(1)
        .max(255),

    author: Joi.string()
        .trim()
        .min(1)
        .max(255),

    isbn: Joi.string()
        .trim()
        .min(10)
        .max(20),

    category: Joi.string()
        .trim()
        .min(1)
        .max(100),

    publisher: Joi.string()
        .trim()
        .max(255)
        .allow(""),

    publishedYear: Joi.number()
        .integer()
        .min(1000)
        .max(new Date().getFullYear()),

    quantity: Joi.number()
        .integer()
        .min(0),

    description: Joi.string()
        .allow(""),

    coverImage: Joi.string()
        .uri()
        .allow("")
})
.min(1);

module.exports = {
    createBookSchema,
    updateBookSchema
};