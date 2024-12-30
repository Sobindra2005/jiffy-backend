const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AchievementSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    obtainedDate: {
        type: Date,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
});

const Achievement = mongoose.model('Achievement', AchievementSchema);
module.exports = {Achievement};