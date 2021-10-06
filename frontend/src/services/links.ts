import axios from 'axios';
import storage from '../utils/storage';
import { Link, BasicLink, UpdateLink } from '../types';

const baseUrl = 'http://localhost:3001/api/links';
const getConfig = () => {
    const user = storage.loadUser();
    if(!user) return null;
    return {
      headers: { Authorization: `bearer ${storage.loadUser().token}` }
    }
}

const getAll = async () => {
    const res = await axios.get<Link[]>(baseUrl);
    return res.data;
}

const addLink = async (link: BasicLink) => {
    const header = getConfig();
    if(header) {
        const res = await axios.post<Link>(baseUrl, link, header);
        return res.data;
    }
    else {
        console.error('Missing header');
        return null;
    }
}

const updateLink = async (id: Link['id'], link: UpdateLink) => {
    const header = getConfig();
    console.log(header);
    if(header) {
        const res = await axios.put<Link>(`${baseUrl}/${id}`, link, header);
        console.log("Link service res");
        return res.data;
    }
    else {
        console.error('Missing header');
        return null;
    }
}

export default { updateLink, addLink, getAll, getConfig };