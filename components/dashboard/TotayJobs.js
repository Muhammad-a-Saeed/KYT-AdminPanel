import React from 'react';

const CircularProgressBar = ({ percentage, color, jobCount }) => {
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <svg
            height={radius * 2}
            width={radius * 2}
            className="rotate-270 transform"
        >
            <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke={color}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill={color}
                className="text-sm font-semibold"
            >
                {jobCount}
            </text>
        </svg>
    );
};

const TodayJobs = ({ completedCountValue, pendingCountValue, completedPercentage, pendingPercentage }) => {
    const divStyle = {
        boxShadow: '0px 1px 3px 0px #0051AF1A'
    };
    return (
        <div className="p-6 w-full bg-white rounded-xl  space-y-4" style={divStyle}>
            <h2 className=" font-medium text-[#4E5564] text-center">
                Today Bookings
            </h2>
            <div className="flex justify-around">
                <div className="flex flex-col items-center">
                    <p className="mt-2 text-sm text-gray-700">Completed</p>
                    <CircularProgressBar percentage={completedPercentage} color="#1A55A5" jobCount={completedCountValue} />
                </div>
                <div className="flex flex-col items-center">
                    <p className="mt-2 text-sm text-gray-700">Pending</p>
                    <CircularProgressBar percentage={pendingPercentage} color="#10B981" jobCount={pendingCountValue} />
                </div>
            </div>
        </div>
    );
};

export default TodayJobs;
