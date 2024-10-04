import CHEVRON, { Chevron_Down_SVG } from '@/utils/svgGrabber';
import React, { useEffect, useState } from 'react';

const ProgressBar = ({ title, color, percentage, total }) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-gray-700">{title}</span>
            </div>
            <div className="w-full flex items-center gap-3">
                <div className="flex-grow bg-[#F8F8F8] rounded-full h-3">
                    <div
                        className={`h-3 rounded-full`}
                        style={{ width: `${percentage}%`, backgroundColor: color }}
                    ></div>
                </div>
                <span className="text-sm font-medium text-[#4E5564]">{total}</span>
            </div>
        </div>
    );
};

const TotalRevenue = ({ totalRevenue, selectedYearProp, onYearChange, revenuePercentage }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
    // Generate a range of years from 20 years ago to 10 years in the future
    const generateYears = (start, end) => {
        let yearsArray = [];
        for (let year = start; year <= end; year++) {
            yearsArray.push(year);
        }
        return yearsArray;
    };
    useEffect(() => {
        if (selectedYearProp) {
            setSelectedYear(selectedYearProp);
        }
    }, [selectedYearProp]);
    const currentYear = new Date().getFullYear();
    const years = generateYears(currentYear - 40, currentYear + 10);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        onYearChange(year)
        setIsDropdownVisible(false); // Hide the dropdown after selection
    };

    const divStyle = {
        boxShadow: '0px 1px 3px 0px #0051AF1A'
    };

    return (
        <div className=" flex justify-center flex-col p-6 w-full bg-white rounded-xl space-y-4" style={divStyle}>
            <div className='flex justify-between relative'>
                <h2 className="text-xl font-semibold text-secondary">Total Earning</h2>
                <div
                    className='px-3 border flex justify-between cursor-pointer rounded-md gap-2 items-center border-[#1A55A5]'
                    onClick={toggleDropdown}
                >
                    <p className='text-[#1A55A5] text-sm font-medium'>{selectedYear}</p>
                    <Chevron_Down_SVG />
                </div>
                {isDropdownVisible && (
                    <div className="absolute right-0 top-7 mt-1 w-32 bg-white border max-h-40 overflow-y-auto border-gray-200 rounded-md shadow-lg z-10">
                        {years.map((year) => (
                            <div
                                key={year}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleYearSelect(year)}
                            >
                                {year}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ProgressBar title="Total Revenue" color="#10B981" percentage={revenuePercentage} total={totalRevenue} />
        </div>
    );
};

export default TotalRevenue;
