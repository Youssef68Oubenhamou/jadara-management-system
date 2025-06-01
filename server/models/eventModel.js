import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
        title_event: {
            type: String,
            required: true 
        },

        description_event: {
            type: String,
            required: true 
        },

        date_event: {
            type: Date,
            required: true 
        },

        location_event: {
            type: String,
            required: true 
        },

        image: {
            type: String,
            required: true
        },
    },
);

const Event = mongoose.model("Event" ,eventSchema);
export default Event;