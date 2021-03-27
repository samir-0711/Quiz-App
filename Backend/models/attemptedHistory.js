import mongoose from 'mongoose';

const historySchema = mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    question: [{
        questionID: {
            type: mongoose.Types.ObjectId,
            ref: 'Question'
        },
        answerAttempted: Number,
        isCorrect: Boolean 
    }]
}, { timestamps: true });

const historyModel = mongoose.model('History', historySchema);
export default historyModel;