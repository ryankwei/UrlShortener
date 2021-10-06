import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { ILink } from './link';
import { NewUser } from '../types';

export interface IUser extends Document, NewUser {
    links: Array<ILink['_id']>;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        unique: true,
        minlength: 3,
        require: true
    },
    name: String,
    password: {
        type: String,
        require: true,
        unique: true
    },
    links: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Link'
        }
    ]
});
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
});

export default mongoose.model<IUser>('User', userSchema);