import React from 'react';



const JobStats = ({ pendingBookings, totalBookings, completedBookings }) => {

    const data = [

        {
            heading: "Pending Booking",
            number: pendingBookings,
        },
        {
            heading: "Total Booking",
            number: totalBookings,
        },
        {
            heading: "Completed Booking",
            number: completedBookings,
        },
    ];
    const divStyle = {
        boxShadow: '0px 1px 3px 0px #0051AF1A'
    };
    return (
        <div className="flex sm:flex-row flex-col md:gap-y-0 gap-y-5 mt-10 md:py-12 p-7 rounded-lg bg-white w-full" style={divStyle}>
            {
                data.map((item, index) => (
                    <div className={`flex flex-col gap-3 items-center  w-full ${index !== data.length - 1 ? 'md:border-r md:border-b-0 border-b border-[#E2E8F0]' : ''}`} key={index}>
                        <h3 className="text-[#4E5564] font-medium">{item?.heading}</h3>
                        <span className="text-2xl font-medium text-secondary md:pb-0 pb-3">{item?.number}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default JobStats;