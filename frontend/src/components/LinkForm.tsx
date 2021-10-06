import React from 'react';
import { BasicLink } from '../types';

const LinkForm: React.FC<{ onSubmit: (link: BasicLink) => void }> = ({ onSubmit }) => {
    const [fromLink, setFromLink] = React.useState('');
    const [toLink, setToLink] = React.useState('');

    const newLink = (event: React.FormEvent<HTMLFormElement>) => {  
        event.preventDefault();
        onSubmit({ fromLink, toLink });
        setFromLink('');
        setToLink('');
    };

    return (
        <div>
            <h1 className="py-4 font-semibold text-xl">
                Simple Url Shortener
            </h1>            
            <form onSubmit={newLink}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    From: 
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                       id="fromLink" 
                       type="text" 
                       placeholder="From: " 
                       value={fromLink}
                       onChange={({ target }) => setFromLink(target.value)}
                />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    To: 
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                       id="toLink"
                       type="text"
                       placeholder="To: "
                       value={toLink}
                       onChange={({target }) => setToLink(target.value) }
                />
                </div>
                <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Create Link
                </button>
                </div>
            </form>            
        </div>
    )
}

export default LinkForm;