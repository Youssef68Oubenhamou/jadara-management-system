import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const courseSchema = new Schema({

    title : {
        type : String,
        required: true
    },

    course_length: {
        type: Number,
        required: true
    },
    course_description: {
        type: String,
        required: true
    },
    course_content: {
        type: String,
        required: true
    },
    course_image: {
        type: String,
        required: true
    },
   
});

export const Course = mongoose.model('Course', courseSchema);