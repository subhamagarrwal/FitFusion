const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review.js')
const { campgroundSchema, reviewSchema } = require('./Schemas.js')

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','You must be signed in!');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    // Basic error we have defined ourselves
    // if(!req.body.campground) throw new ExpressError('Invalid CampSpot Data!', 400);

    // We will now create a new Schema to validate our entries
    // This is not mongoose schema, this is joi schema

    // const campgroundSchema = Joi.object({
    //     campground : Joi.object({
    //         title : Joi.string().required(),
    //         price : Joi.number().required().min(0),
    //         images: Joi.string().required(),
    //         location : Joi.string().required(),
    //         description : Joi.string().required
    //     }).required()
    // })
    console.log(typeof(req.body.campground.images))
    console.log(typeof(req.body.campground.title));
    const { error } = campgroundSchema.validate(req.body)
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req,res,next) =>{
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You do not have the permission to do that!')
        return res.redirect(`/campgrounds/${campground._id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    const {reviewID} = req.params;
    const review = await Review.findById(reviewID);
     if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have the permission to do that!')
        return res.redirect(`/campgrounds/${campground._id}`)
    }
    next();

}

module.exports.validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body)
    if(error) { 
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

