require("dotenv").config();
const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./Utils/ExpressError.js");
const listingRoute=require("./routes/listing.js");
const reviewRoute=require("./routes/review.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const userRoute=require("./routes/user.js");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("./models/user.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

const MONGO_URL=process.env.ATLAS_DB_URL;

const store=MongoStore.create({
    mongoUrl:MONGO_URL,
    touchAfter:24*3600,
    crypto:{
        secret:process.env.SECRET_CODE
    }
})

const sessionObject={
    secret:process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: true,
    store:store,
    cookie:{
        expires: Date.now()+1000*60*60*24*3,
        maxAge:1000*60*60*24*3,
        httpOnly:true
    }
}

app.use(session(sessionObject));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main().then(res=>{
    console.log("Connection successful");
}).catch(err=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.failure= req.flash("failure");
    res.locals.invalid= req.flash("Invalid");  
    res.locals.currUser= req.user;   
    next();
})

// home route
app.get("/",(req,res)=>{
    res.redirect("/listings");
})

app.use("/listings",listingRoute);
// Add Reviews Route

app.use("/listings/:listingid/reviews",reviewRoute);

// User Route
app.use("/",userRoute);

app.all("*",(req,res,next)=>{
    let err=new ExpressError(400,"Page Not Found");
    next(err);
})

app.use((err,req,res,next)=>{
    if (res.headersSent) {
        return next(err); 
    }else{
    let {status, message}=err;
    req.flash("failure",message);
    res.redirect("/listings");
}
    
})

app.listen("8080",()=>{
    console.log("app is listening on port 8080");
})