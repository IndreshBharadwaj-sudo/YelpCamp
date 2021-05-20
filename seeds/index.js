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
const img = [{ filename: 'YelpCamp/wqn3xk8x5trxqmum3qgm.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621423229/YelpCamp/wqn3xk8x5trxqmum3qgm.jpg' },
             { filename: 'YelpCamp/lsaj5x3f015olskqvn6l.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621487100/YelpCamp/lsaj5x3f015olskqvn6l.jpg' },
             { filename: 'YelpCamp/mtkgvj6gcldxwfxmu5jo.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621405054/YelpCamp/mtkgvj6gcldxwfxmu5jo.jpg' },
             { filename: 'YelpCamp/jjcav0nenfhrz2pgusuz.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621341313/YelpCamp/jjcav0nenfhrz2pgusuz.jpg' },
             { filename: 'YelpCamp/lbgdaykkzlcskshmzmp1.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621341312/YelpCamp/lbgdaykkzlcskshmzmp1.jpg' },
             { filename: 'YelpCamp/sk3at61i5ibvdrpzewsn.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621458149/YelpCamp/sk3at61i5ibvdrpzewsn.jpg' },
             { filename: 'YelpCamp/g0cz6h7vpeatvxlcmghb.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621458149/YelpCamp/g0cz6h7vpeatvxlcmghb.jpg' },
             { filename: 'YelpCamp/ktealobwnawntyqemijq.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621487243/YelpCamp/ktealobwnawntyqemijq.jpg' },
             { filename: 'YelpCamp/w9c2n1oj7rtpfdkfscmd.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621458150/YelpCamp/w9c2n1oj7rtpfdkfscmd.jpg' },
             { filename: 'YelpCamp/jugrmgvbm2qlcelrbdil.jpg', url: 'https://res.cloudinary.com/indresh/image/upload/v1621458149/YelpCamp/jugrmgvbm2qlcelrbdil.jpg' }

]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++)
    {
        var z = Math.floor(Math.random() * 10);
        var z1 = Math.floor(Math.random() * 10);
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
            images: [img[z],img[z1]],
            des: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi repellat harum, aspernatur dolores tempora.',
            price: price
        })
        await camp.save();
    }
}
seedDB();