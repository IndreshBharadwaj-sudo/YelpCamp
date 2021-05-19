const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');
const Campground = require('../models/campground')
const dbUrl = 'mongodb+srv://indresh584:Indresh@1@cluster0.6j6qq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
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
            author: '60a54ab44c6ce827f80d9c41',
            location: `${ cities[random1000].city },${ cities[random1000].state }`,
            title: `${ sample(descriptors) } ${ sample(places) }`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                    filename: 'YelpCamp/wqn3xk8x5trxqmum3qgm.jpg',
                    url: 'https://res.cloudinary.com/indresh/image/upload/v1621423229/YelpCamp/wqn3xk8x5trxqmum3qgm.jpg'
            },
                {
                filename: 'YelpCamp/jnz8vdgryg3wuep5hown.jpg',
                url: 'https://res.cloudinary.com/indresh/image/upload/v1621402721/YelpCamp/jnz8vdgryg3wuep5hown.jpg'
            }
            ],
            des: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi repellat harum, aspernatur dolores tempora.',
            price: price
        })
        await camp.save();
    }
}
seedDB();