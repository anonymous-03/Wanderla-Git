const joi = require('joi');

const listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required(),
        image: joi.object({
            filename:joi.string().required,
            url:joi.string()
        }).allow("",null)
    }).required()
});

const reviewSchema = joi.object({
    review: joi.object({
        comments: joi.string().required(),
        ratings: joi.number().required(),
        created_at: joi.date()
    }).required()
});

module.exports = {
    listingSchema,
    reviewSchema
};
