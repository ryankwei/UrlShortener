import Link, { ILink } from '../models/link';
import { IUser } from '../models/User';
import { NewLink, UpdateLink } from '../types';
const getData = async (): Promise<ILink[]> => {
    return await Link.find({}).populate('user', { username: 1, name: 1 });
}

const findById = async (id: ILink['_id']): Promise<ILink | null> => {
    return await Link.findById(id).populate('user', { username: 1, name: 1 });
}

const addData = async (link: NewLink, id: IUser['_id']): Promise<ILink | null> => {
    const fullLink = new Link({
        ...link,
        user: id
    });
    const savedLink = await fullLink.save();
    console.log(savedLink);
    return await Link.findById(savedLink._id).populate('user', { username: 1, name: 1});
}

const updateLink = async (link: UpdateLink, id: ILink['_id']): Promise<ILink | null> => {
    const updatedLink = await Link.findByIdAndUpdate(id, link, { new: true }).populate('user', { username: 1, name: 1 });

    return updatedLink;
}

export default {
    getData,
    findById,
    addData,
    updateLink
}