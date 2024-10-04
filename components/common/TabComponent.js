import React, { useRef, useEffect } from 'react';

const TabComponent = ({ array = [], tab, setTab, customClass, children }) => {
    const tabRefs = useRef([]);

    useEffect(() => {
        tabRefs.current = tabRefs.current.slice(0, array.length);
    }, [array]);

    const handleTabClick = (item, index) => {
        setTab(item);
        if (tabRefs.current[index]) {
            tabRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    };

    return (
        <div className={`my-5 bg-white px-4 py-6 ${customClass} overflow-hidden`}>
            <div id='scroll-none' className="flex overflow-x-auto w-full">
                {array?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            ref={(el) => (tabRefs.current[index] = el)}
                            onClick={() => handleTabClick(item, index)}
                            className={`inline-flex items-center ${tab === item
                                    ? '!bg-primary text-white rounded-t-md'
                                    : 'hover:bg-[#ffebe7]'
                                } h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent sm:text-base whitespace-nowrap cursor-pointer focus:outline-none`}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
            <div className='w-full p-3 rounded-md ring-1 ring-gray-300 mt-1 min-h-[50vh]'>
                {children}
            </div>
        </div>
    );
};

export default TabComponent;




// import React from 'react'

// const TabComponent = ({ array = [], tab, setTab, customClass, children }) => {
//     return (
//         <div className={`my-5 bg-white px-4 py-6 ${customClass} overflow-hidden`}>
//             <div id='scroll-none' className="flex overflow-x-auto w-full ">


//                 {array?.map((item, index) => {
//                     return (
//                         <button key={index} onClick={() => setTab(item)} className={`inline-flex items-center ${tab === item ? " !bg-primary rounded-t-md text-white" : "hover:bg-[#ffebe7]"} h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent  sm:text-base whitespace-nowrap cursor-base focus:outline-none `}>
//                             {item}
//                         </button>
//                     )
//                 })}
//             </div>
//             <div className='w-full p-3 rounded-md ring-1 ring-gray-300 mt-1 min-h-[50vh]'>
//                 {children}
//             </div>
//         </div>
//     )
// }
// export default TabComponent
