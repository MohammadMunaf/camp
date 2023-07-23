const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64bb7db00914b732b86c5e50', //Mehfooz's  id pass-Mehfooz
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Camping, forest, campfire, food over fire, coffee, mist, woods, sunsets, lakes, leaves and trees',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dl6otmbjy/image/upload/v1689835370/YelpCamp/mqfgjtzw7ydqeocqjcin.jpg',
                    filename: 'YelpCamp/mqfgjtzw7ydqeocqjcin'
                },
                {
                    url: 'https://res.cloudinary.com/dl6otmbjy/image/upload/v1689841596/YelpCamp/lkpdtwaw1heylvo5o78t.webp',
                    filename: 'YelpCamp/lkpdtwaw1heylvo5o78t'
                }

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})