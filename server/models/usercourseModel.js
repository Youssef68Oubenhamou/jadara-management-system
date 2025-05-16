import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const usercourseSchema = new Schema({

    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
   
});

const Usercourse = mongoose.model('Usercourse', usercourseSchema);
export default Usercourse;