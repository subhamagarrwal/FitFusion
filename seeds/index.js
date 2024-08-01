// importing all dependencies
const mongoose = require('mongoose')
const Campground = require('../models/campground');
const cities = require('./cities')

// setting up local mongoose connection
mongoose.connect('mongodb://localhost:27017/findMyCampSpot');
const {places,descriptors} = require('./seedHelpers')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error : "));
db.once("open", ()=>{
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() =>{
    await Campground.deleteMany({})
    for(let i=0;i<50;i++){
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            title : `${sample(descriptors)} ${sample(places)}`,
            location : `${cities[rand1000].city}, ${cities[rand1000].state}`,
            author: '66a001a8c508da67071202cd',
            price: price,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[rand1000].longitude, 
                cities[rand1000].latitude
              ]
            },
            description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, dolore ex. Et iure dolor modi est debitis. Deleniti commodi necessitatibus aspernatur doloribus ex! Aperiam ut eum corporis voluptatem distinctio at.',
            images: [
                {
                  url: 'https://res.cloudinary.com/diyc8dqks/image/upload/v1722538772/FitFusion/iwbirt30rn6nwuvzsj63.jpg',
                  filename: 'FitFusion/iwbirt30rn6nwuvzsj63',
                },
                {
                  url: 'https://res.cloudinary.com/diyc8dqks/image/upload/v1722538755/FitFusion/hyekgokhwyuzbkk3mv9x.jpg',
                  filename: 'FitFusion/hyekgokhwyuzbkk3mv9x',
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})

