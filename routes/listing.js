const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const asyncWrap=require("../Utils/asyncWrap.js");
const User=require("../models/user.js");
const {isAuthorizedListing,validateListing,isLoggedIn}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage})



router.get("/",asyncWrap(listingController.allListing));

// New Listings

router.get("/new",isLoggedIn,asyncWrap(listingController.newListing))

// Add New Listing
router.post("/",isLoggedIn,upload.single('listingimage'),validateListing,
    asyncWrap(listingController.addNewListing))

// show route
router.get("/:id",isLoggedIn,asyncWrap(listingController.showListing))

// edit and update route

router.get("/:id/edit",isLoggedIn,isAuthorizedListing,asyncWrap(listingController.editListing))

router.patch("/:id",isLoggedIn,isAuthorizedListing,upload.single('listingimage'),validateListing,asyncWrap(listingController.editListingpatch));
   
// Destroy Route

router.delete("/:id",isLoggedIn,isAuthorizedListing,asyncWrap(listingController.destroyRoute));

module.exports=router;