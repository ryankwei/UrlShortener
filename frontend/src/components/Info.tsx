import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeLinks } from "../state/reducers/linkReducer";
import { RootState } from  "../state/store";
import { Token } from "../types";
import { Link } from "react-router-dom";
const Info: React.FC<{ user: Token | null, signout: () => void }> = ({ user, signout }) => {
    const links = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if(!links) {
            dispatch(initializeLinks());
        }
    }, [dispatch, links])

    if(!user) {
        return null;
    }
    const logout = (event: React.MouseEvent<HTMLButtonElement>) => { 
        event.preventDefault();
        signout(); 
    }
    return (
        <div>
            <div className="flex justify-center relative">
                <h1 className="py-4 font-semibold text-xl">
                    Your Links
                </h1>
                <button onClick={logout}>
                    <svg className="fill-current h-6 w-6 text-gray-300 absolute top-0 right-0" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </button>
            </div>
            <div className="flex justify-center">
                <table>
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left px-4 py-4 text-xs tracking-wider">From: </th>
                            <th className="text-left px-4 py-4 text-xs tracking-wider">To: </th>
                            <th className="text-left px-4 py-4 text-xs tracking-wider">Views: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map(link => {
                            if(link.user.username !== user.username) return null;
                            return (
                                <tr key={link.id}>
                                    <td className="text-left border px-5 py-4 text-sm">{link.fromLink}</td>
                                    <td className="text-left border px-5 py-4 text-sm">{link.toLink}</td>
                                    <td className="text-left border px-5 py-4 text-sm">{link.numReached}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Link to={'/new'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 py-4" href="#">
                Create New Link
            </Link>
        </div>
    )
}

export default Info;