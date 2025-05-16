import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userEventsSchema = new Schema({

    user_id : {
        type : mongoose.Schema.Types.objectId,
        ref: "User",
        required: true
    },
    event_id : {
        type : mongoose.Schema.Types.objectId,
        ref: "Event",
        required: true
    },
});

const UserEvent = mongoose.model('UserEvent', userEventsSchema);
export default UserEvent;