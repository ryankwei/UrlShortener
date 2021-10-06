import User, { IUser } from '../models/user';
import { NewUser } from '../types';

const addUser = async (user: NewUser): Promise<IUser | null> => {
    const fullUser = new User({
        ...user
    });

    const savedUser = await fullUser.save();
    return await User.findById(savedUser._id).populate('links', { fromLink: 1, toLink: 1 });
}

const findById = async (id: IUser['_id']): Promise<IUser | null> => {
    return await User.findById(id).populate('link', { fromLink: 1, toLink: 1 });
}

const findByUsername = async (username: IUser['username']): Promise<IUser | null> => {
    return await User.findOne({ username: username }).populate('link', { fromLink: 1, toLink: 1});
}

export default {
    addUser,
    findById,
    findByUsername
}