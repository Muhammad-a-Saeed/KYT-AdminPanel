import React from 'react';

const RecentCard = ({ data, heading, customClass,show=false }) => {
    const divStyle = {
        boxShadow: `0px 10px 13px 0px #1126920D`
    };
    const childStyle = {
        boxShadow: `0px 6px 12px - 3px #4153B30D`,
        boxShadow: `0px 0px 2px 0px #4153B30D`
    };


    return (
        <div style={divStyle} className='min-h-[490px] rounded-md mt-8 bg-white w-1/3 '>
            <div className='h-[60px] shadow-sm flex justify-between items-center'>
                <h1 className='text-[16px] font-bold pl-4'>{heading}</h1>
                <p className='text-primary cursor-pointer text-sm pr-4 underline'>View All</p>
            </div>
            {data?.map((item, index) => (

                <div key={index} className='flex justify-between items-center text-[#758590] text-sm border-b-[1px] border-b-[#F1F1F1] mx-4'>
                    <div className='py-5 flex items-center gap-5'>
                        <img className='h-[50px]' src={item.imgSrc} alt="" />
                        <div className=''>
                            <div className='flex flex-col gap-y-1'>
                                <h1 className='font-bold'>{item.name}</h1>
                                <p className={customClass}>{item.count}</p>
                            </div>
                        </div>
                    </div>
                    {show && <div className='h-10 flex justify-center text-primary items-center w-28 rounded-full bg-[#5F60B91A]'>
                        Pending
                    </div>}
                </div>


            ))}
        </div>
    )
}

export default RecentCard;
