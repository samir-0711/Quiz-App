import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
    Tag: {
        type: String,
        require: [true, 'Tag is Required']
        // enum: ["General Knowledge", "Entertainment: Film", "Science & Nature", "Science: Computers" ]
    },
    question: {
        type: String,
        require: [true, 'Question is Required'],
        maxlength: 500
    },
    options: {
        type: Object,
        require: [true, 'Options are Required']
    },
    answer: {
        type: Number,
        require: [true, 'Answer is Required'],
    }
}, { timestamps: true });

const questionModel = mongoose.model('Question', questionSchema);
export default questionModel;