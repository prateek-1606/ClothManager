const mongoose = require('mongoose')

const ClothSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Cost: {
        type: Number,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    Ownername: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isShared: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Cloth', ClothSchema)