import React from 'react';

const Loading = ({ loading }) => {
    return (
        <div className={`${!loading && "hidden"} fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50  z-[999]`}>
            <div className="border-t-4 border-gray-300 rounded-full animate-spin w-12 h-12"></div>
        </div>
    );
};

export default Loading;