import React from "react";
import { Link } from "react-router-dom";

const Redirector: React.FC = () => {
    return (<div>
        <h1 className="py-4 font-semibold text-xl flex justify-center">
            Taking you to your link...
        </h1>  
        <Link to={'/info'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Return Home
        </Link>      
    </div>);
}

export default Redirector;