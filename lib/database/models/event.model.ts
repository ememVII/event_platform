import { Document, Schema, model, models } from "mongoose";

// Define the interface for the Event document
export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url?: string;
    organizer: { _id: string, firstName: string, lastName: string, photo: string,
                email: string, username: string }
    category: { _id: string, name: string }
}

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    organizer: { type: Schema.Types.ObjectId, ref: 'User'},
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
})

const Event = models.Event || model('Event', EventSchema)

export default Event