const Review = require("../models/reviews.js");
const User = require("../models/user.js");
const Listing = require("../models/listing.js");

module.exports.addReview = async (req, res) => {
    let id = req.params.listingid;
    let listing = await Listing.findById(id);
    res.render("./listings/reviewsform.ejs", { listing });
}

module.exports.addReviewPost = async (req, res) => {
    let id = req.params.listingid;
    let user = req.user.username;
    const UserId = await User.findOne({ username: user });

    let { comments, ratings } = req.body;
    const review = await Review.create({
        comment: comments,
        rating: ratings,
        owner: UserId._id
    })
    let listing = await Listing.findById(id);
    listing.reviews.push(review);
    await listing.save();
    res.redirect(`/listings/${id}`);
}

module.exports.editReview = async (req, res) => {
    let id = req.params.id;
    let review = await Review.findById(id);
    let listingId = req.params.listingid;
    res.render("./listings/editreview.ejs", { review, listingId });
}

module.exports.editReviewPatch = async (req, res) => {
    let id = req.params.id;
    let listingId = req.params.listingid;
    let { comments, ratings } = req.body;
    let review = await Review.findById(id);
    review.comment = comments;
    review.rating = ratings;
    await review.save();
    res.redirect(`/listings/${listingId}`);
}

module.exports.destroyReview = async (req, res) => {
    let listingId = req.params.listingid;
    let reviewId = req.params.id;
    try {
        let review = await Review.findByIdAndDelete(reviewId);
        const result = await Listing.updateOne({ _id: listingId }, { $pull: { reviews: reviewId } });
        res.redirect(`/listings/${listingId}`);
    } catch (err) {
        console.error("Error deleting review:", err);
        res.status(500).send("Internal Server Error");
    }
}