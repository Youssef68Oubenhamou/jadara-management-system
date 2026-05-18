import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({

    username : {
        type : String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    group: {
        type: Number,
        required: true
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        default: new mongoose.Types.ObjectId('6a09d9566ee0e8e7c3c47b57')
    },
});

const User = mongoose.model('User', userSchema);
export default User;