const express = require('express');
const router = express.Router({mergeParams: true}); 
const { reviewSchema } = require('../Schemas')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const Review = require('../models/review')
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
const reviews = require('../controllers/reviews')

// adding a reviews post method
router.post('/',isLoggedIn, validateReview, catchAsync(reviews.addReview))

// deleting reviews from a gym page
router.delete('/:reviewID',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;