const User = require("../models/user");

module.exports.registerUser=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.registerForm=async (req,res)=>{
    let {email,username,password}=req.body;
    let newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success",`Welcome ${username} to WanderLust`);
        res.redirect("/listings");
    })
    
}

module.exports.loginRoute=(req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.login=async(req,res)=>{
    let {username,password}=req.body;
    req.flash("success",`Welcome ${username} to Wanderla!`);
    const Url=res.locals.redirectUrl||"/listings"
    res.redirect(Url);
}

module.exports.logoutRoute=(req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You have successfully logged out");
        res.redirect("/login");
    })
    
}