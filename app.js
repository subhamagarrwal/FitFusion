// // initializing dotenv 
// if(process.env.NODE_ENV !== "production"){
//     require('dotenv').config()
// }
require('dotenv').config()

// importing all dependencies
const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')
const ejsMate = require('ejs-mate');
const path = require('path')
const app = express();
const flash = require('connect-flash');
const userRoutes = require('./routes/users')
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const helmet=require('helmet');
const { name } = require('ejs');
const session = require('express-session');
//connect-mongo
const MongoStore=require("connect-mongo");

//const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/findMyCampSpot';
const dbUrl ='mongodb://localhost:27017/findMyCampSpot';
// setting up local mongoose connection
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error : "));
db.once("open", () => {
    console.log("Database connected")
});

// setting up ejs and other middlewares
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))     // to parse json
app.use(methodOverride('_method')); // to use put and delete methods on our forms
app.use(express.static(path.join(__dirname,'public')))

//creating mongo session before the session config
const store= MongoStore.create({
    mongoUrl:dbUrl,
    secret:'thisshouldbeabettersecret',
    crypto:{
        secret:'thisshouldbeabettersecret!'
    }
});

store.on('error',function(e){
  console.log('Session store error',e);
});
// initialising session and defining its properties
const sessionConfig = {
    store,
    name : 'practise',
    secret : 'Thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7

    }
} 

// adding flash and session
app.use(session(sessionConfig));
app.use(flash());

// addding passport authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
// serialization
passport.serializeUser(User.serializeUser());   // how to store user in a session 
passport.deserializeUser(User.deserializeUser());   // how to log user out of a session
app.use(helmet({
    contentSecurityPolicy:false
}));

//adding helmet-start
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    // "https://api.tiles.mapbox.com/",
    // "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", // add this
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    // "https://api.mapbox.com/",
    // "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", // add this
];
const connectSrcUrls = [
    // "https://api.mapbox.com/",
    // "https://a.tiles.mapbox.com/",
    // "https://b.tiles.mapbox.com/",
    // "https://events.mapbox.com/",
    "https://api.maptiler.com/", // add this
];
//adding helmet-stop

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    next();
})

// setting up the middleware of our routers to work

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('home')
})

// Setting 404 error
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

// default error handling route
app.use((err, req, res, next) => {
    const { status = 500 } = err
    if (!err.message) err.message = "Something went wrong"
    res.status(status).render('error', { err })
})


app.listen(8000, () => {
    console.log("Server is up and running at port 8000")
})
