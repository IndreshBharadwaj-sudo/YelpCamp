const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
        url: String,
        filename:String
    })
ImageSchema.virtual('thumbnail').get(function ()
{
    return this.url.replace('/upload', '/upload/w_200');
})

const CampgroundSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
    title: String,
    images: [ImageSchema],
    des:String,
    price: Number,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
},opts);
CampgroundSchema.virtual('properties.popUpMarkup').get(function ()
{
    return `<strong><a href="/campgrounds/${ this._id }">${ this.title }</a><strong>
    <p>${this.des.substring(0,20)}...</p>`;
})

CampgroundSchema.post('findOneAndDelete', async function (doc)
{
    if (doc)
    {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);