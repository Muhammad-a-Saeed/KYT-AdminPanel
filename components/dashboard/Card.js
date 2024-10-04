import { ADD, DRUGS, PHARMACY, STOCK, USERS } from '@/utils/svgGrabber';
import Link from 'next/link';
import React from 'react'

const Card = ({ totalUsers, totalAffiliateUsers, totalPRUsers,totalUpcomingEvents }) => {
    const data = [
        {
            src: "/icons/card2.png",
            provider: 'Total Users',
            number: totalUsers,
            path: "/dashboard/users"
        },
        {
            src: "/icons/card1.png",
            provider: 'Total Affiliate Users',
            number: totalAffiliateUsers,
            path: "/dashboard/publicAffiliateUser"
        },

        {
            src: "/icons/card3.png",
            provider: 'Total PR Users',
            number: totalPRUsers,
            path: "/dashboard/publicRelationUser"
        },
        {
            src: "/icons/card3.png",
            provider: 'Total Upcoming Events',
            number: totalUpcomingEvents,
            path: "/dashboard/events"
        }
    ];

    const divStyle = {
        boxShadow: '0px 1px 3px 0px #0051AF1A'
    };

    return (
        <div className='flex sm:flex-nowrap flex-wrap gap-4 w-full'>
            {
                data.map((item, index) => (
                    <div key={index} className=' rounded-lg p-5 w-full bg-white' style={divStyle}>
                        <div className='flex flex-col gap-7'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <img className='h-10' src={item?.src} alt="" />
                                    <h1 className='text-[#4E5564] font-semibold mt-1'>{item?.provider}</h1>
                                </div>
                                {/* <div className='cursor-pointer'>
                                    <ADD custom={index === 0 ? "#1A55A5" : index === 1 ? "#F7B84B" : "#CC7A00"} />
                                </div> */}
                            </div>
                            <Link href={item?.path} className='flex justify-between'>
                                <h1 className='text-xl font-medium text-secondary'>{item?.number}</h1>
                                <p className={`${index === 0 ? "text-[#1A55A5]" : index === 1 ? "text-[#F7B84B]" : "text-[#CC7A00]"} cursor-pointer font-medium`}>View all</p>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Card
