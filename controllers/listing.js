const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeoCoding({ accessToken: process.env.MAP_TOKEN });




module.exports.allListing = async (req, res) => {
    const listings = await Listing.find({});
    res.render("./listings/main.ejs", { listings });
}

module.exports.newListing = async (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.addNewListing = async (req, res, next) => {
    let { title, description, image, price, location, country } = req.body;
    let user = req.user.username;
    const UserId = await User.findOne({ username: user });
    const url = req.file.path;
    const filename = req.file.filename;

    const coordinates=await geocodingClient.forwardGeocode({
        query: location,
        limit: 1
    })
    .send()

    let newCoordinate=coordinates.body.features[0].geometry;



    req.flash("success", "Listing Added Sucessfully!");
    const newListing = await Listing.create({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
        image: {
            filename: filename,
            url: url
        },
        owner: UserId._id,
        geometry:newCoordinate
    })
    console.log(newListing);
    res.redirect("/listings");
}

module.exports.showListing = async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id).populate({path:'reviews',
        populate:{
            path:'owner',
            model:'User'
        },
});
    console.log(id);
    if (!listing) {
        req.flash("Invalid", "Listing Doesnot Exists");
        res.redirect("/listings");
    }
    // console.log(listing.reviews[0].comment);
    res.render("./listings/show.ejs", { listing });
}

module.exports.editListing = async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    let originalUrl = listing.image.url;
    const updatedUrl = originalUrl.replace("/upload", "/upload/h_300,w_350")
    res.render("./listings/edit.ejs", { listing, updatedUrl });
}

module.exports.editListingpatch = async (req, res) => {
    let listing = req.body.listing;
    let id = req.params.id;

    const newlisting = await Listing.findByIdAndUpdate(
        id,
        {
            title: listing.title,
            description: listing.description,
            price: listing.price,
            location: listing.location,
            country: listing.country
        },
        { new: true } // <-- this returns the updated document
    )
    if (typeof (req.file) !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newlisting.image = { url, filename };
        await newlisting.save();

    }
    res.redirect(`/listings/${id}`);
}


module.exports.destroyRoute = async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id).then(res => {
        req.flash("failure", "Listing Deleted Successfully");
    }).catch(err => {
        console.log("error found");
    });
    res.redirect("/listings");
}