const mongoose = require('mongoose');


const user = new mongoose.Schema({  
    username: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true  
    },
    avatar : {
        type: String,
        default:"download.png"

    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    favourites : [{
        type: mongoose.Types
        .ObjectId,
        ref: 'books'
    }],
    cart:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'books'
        }
    ],
    orders:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'orders'
        }
    ]

    


},{
    timestamps: true
});


module.exports = mongoose.model('users', user);