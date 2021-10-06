import React from 'react';

const Notification: React.FC<{ notification: string; }> = ({ notification }) => {
    if(notification === '') return null;
    return (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 m-6 rounded relative" role="alert">
            <span className=" text-center block">{notification}</span>
        </div>
    );
}

export default Notification;