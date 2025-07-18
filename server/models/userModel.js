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
        default: new mongoose.Types.ObjectId('68287e252640e632b867f881')   
    },
});

const User = mongoose.model('User', userSchema);
export default User;