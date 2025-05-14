import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const usercourseSchema = new Schema({

    user_id : {
        type : String,
        required: true
    },

    course_id: {
        type: String,
        required: true
    },
   
});

const Usercourse = mongoose.model('Usercourse', usercourseSchema);
export default Usercourse;