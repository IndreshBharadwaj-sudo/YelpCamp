const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Databse Connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author: '60a01321f5b36d247089f8cb',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${ sample(descriptors) } ${ sample(places) }`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                filename: 'YelpCamp/yibdxorc5zn58frwec00',
                url: 'https://res.cloudinary.com/indresh/image/upload/v1621337018/YelpCamp/yibdxorc5zn58frwec00.jpg'
            },
                {
                filename: 'YelpCamp/aewzdhnkjloiga69h6fw',
                url: 'https://res.cloudinary.com/indresh/image/upload/v1621337019/YelpCamp/aewzdhnkjloiga69h6fw.jpg'
            }
            ],
            des: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi repellat harum, aspernatur dolores tempora.',
            price: price
        })
        await camp.save();
    }
}
seedDB();