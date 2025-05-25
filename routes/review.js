const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const User = require("../models/user.js");
const asyncWrap = require("../Utils/asyncWrap.js");
const { isLoggedIn, isAuthorizedReview, validateReview } = require("../middleware.js");
const reviewController = require("../controllers/review.js");





router.get("/",
    isLoggedIn,
    asyncWrap(reviewController.addReview));

router.post("/", isLoggedIn, validateReview, asyncWrap(reviewController.addReviewPost))

// Edit Reviews
router.get("/:id/edit", isLoggedIn, isAuthorizedReview, asyncWrap(reviewController.editReview));

router.patch("/:id", isLoggedIn, isAuthorizedReview, validateReview, asyncWrap(reviewController.editReviewPatch))

// Delete Reviews
router.delete("/:id", isLoggedIn, isAuthorizedReview, asyncWrap(reviewController.destroyReview));

module.exports = router;
