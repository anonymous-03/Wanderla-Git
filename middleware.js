const Review = require("./models/reviews.js");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");
const ExpressError = require("./Utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");



module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("failure", "You are not logged In");
        res.redirect("/login");
    } else {
        next();
    }

}

module.exports.saveRedirectedUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.validateReview = async (req, res, next) => {

    let { error } = reviewSchema.validate(req.body._original);
    if (error) {
        throw new ExpressError(400, "Review Validation failed");
    }
    next();
}

module.exports.isAuthorizedReview = async (req, res, next) => {
    let id = req.params.id;
    let listingId = req.params.listingid;
    let user = req.user.username;
    let review = await Review.findById(id);
    let UserId = await User.findOne({ username: user });

    if (!review.owner.equals(UserId._id)) {
        req.flash("failure", "You are not authorized to do it");
        return res.redirect(`/listings/${listingId}`);
    } else {
        next();
    }
}

module.exports.validateListing = (req, res, next) => {

    let { error } = listingSchema.validate(req.body._original);

    if (error) {
        throw new ExpressError(400, "Validation Schema failed");
    }
    next();
}

module.exports.isAuthorizedListing = async (req, res, next) => {
    let id = req.params.id;
    let user = req.user.username;
    let listing = await Listing.findById(id);
    let UserId = await User.findOne({ username: user });
    if (!listing.owner.equals(UserId._id)) {
        req.flash("failure", "You are not authorized to do it");
        return res.redirect(`/listings/${id}`);
    } else {
        next();
    }
}