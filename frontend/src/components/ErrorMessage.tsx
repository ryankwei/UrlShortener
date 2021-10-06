import React from 'react';

const ErrorMessage: React.FC<{ errorMessage: string; }> = ({ errorMessage }) => {
    if(errorMessage === '') return null;
    return (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">Something Went Wrong</p>
            <p>{errorMessage}</p>
        </div>
    );
}

export default ErrorMessage;