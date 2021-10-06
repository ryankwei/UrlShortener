import React from 'react';
import { Credentials } from '../types';
import { Link } from "react-router-dom";

const LoginForm: React.FC<{ onSubmit: (credentials: Credentials) => void }> = ({ onSubmit }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = (event: React.FormEvent<HTMLFormElement>) => {  
        event.preventDefault();
        onSubmit({ username, password });
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h1 className="py-4 font-semibold text-xl">
                Simple Url Shortener
            </h1>            
            <form onSubmit={login}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                       id="username" 
                       type="text" 
                       placeholder="Username" 
                       value={username}
                       onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                       id="password"
                       type="password"
                       placeholder="******************"
                       value={password}
                       onChange={({target }) => setPassword(target.value) }
                />
                </div>
                <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign In
                </button>
                <Link to={'/createAccount'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Create Account
                </Link>
                </div>
            </form>            
        </div>
    )
}

export default LoginForm;