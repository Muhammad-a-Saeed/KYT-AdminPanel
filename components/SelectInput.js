import React from 'react';

const SelectInputWithStatus = ({ label, options, steric = true, onChange, selectedOption }) => {
    return (
        <div className="relative w-full pl-8 ">
            <div className='flex gap-1'>
                <label htmlFor="selectInput" className="text-[#8F9FBC] pb-1 font-medium">{label}</label>
                {steric && <span className="text-[#F42B3D]">*</span>}
            </div>
            <div className='mr-8'>
                <select
                    id="selectInput"
                    className="block text-sm font-medium text-[#999999] appearance-none w-full h-[45px] bg-white px-4 py-2 outline-none border-[2px] border-gray-400 rounded-md pr-8 !cursor-pointer leading-tight focus:outline-none focus:shadow-outline"
                    onChange={onChange}
                    value={selectedOption}
                >
                    {options.map((option, index) => (
                        <option className=' text-[#999999]' key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 top-7 right-10 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 12l-6-6h12l-6 6z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SelectInputWithStatus;