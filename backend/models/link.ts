import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';
import { NewLink } from '../types';

export interface ILink extends Document, NewLink {
    user: IUser['_id'];
}

const linkSchema: Schema = new Schema({
    fromLink: { type: String, required: true },
    toLink: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    numReached: { type: Number, required: true }
});

linkSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
});
  
  
export default mongoose.model<ILink>('Link', linkSchema);