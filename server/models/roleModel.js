import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const roleSchema = new Schema({

    role_name : {
        type : String,
        required: true
    },
});

const Role = mongoose.model('Role', roleSchema);
export default Role;