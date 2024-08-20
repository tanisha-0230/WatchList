const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    genres: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    rating: { type: Number, default: null },
    status: { 
        type: String, 
        enum: ["Watched", "Currently Watching", "Unwatched"], 
        required: true 
    },    
    isFavorite: { type: Boolean, default: false},
    userId: { type: String, required: true},
    createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Note", noteSchema);