const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.addReview = async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id; 
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success',"Successfully added your review!!");
    res.redirect(`/campgrounds/${ campground._id}`);
}

module.exports.deleteReview = async(req,res)=>{
    const camp = await Campground.findByIdAndUpdate(req.params.id, {$pull : { reviews : req.params.reviewID}});
    const deletedReview = await Review.findByIdAndDelete(req.params.reviewID);
    console.log(deletedReview);
    req.flash('success',"Successfully deleted the review!!");
    res.redirect(`/campgrounds/${req.params.id}`);
}