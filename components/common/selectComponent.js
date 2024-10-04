import React, { useState, useEffect, useRef } from 'react';

const SelectComponent = ({
    options = [],
    defaultValue,
    resetValue = true,
    setOption,
    chooseOption,
    option,
    width = "w-full",
    containerWidth = "w-[30rem]",
    placeHolder = "Choose Option",
    onchange
}) => {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOpen = () => setOpen(!open);

    const handleSelect = (val) => {
        setSelectedOption(val);
        setOpen(false);
        if (setOption) setOption(val);
        if (onchange) onchange(val);
    };

    useEffect(() => {
        if (!defaultValue && resetValue) setSelectedOption(null);
        displayValue()
    }, [selectedOption, defaultValue])

    const displayValue = () => {
        if (chooseOption && options.length) {
            return selectedOption ? String(selectedOption[chooseOption]) : String(option[chooseOption]);
        }
        if (selectedOption?.length) return selectedOption
        else return placeHolder
    };

    return (
        <div ref={selectRef} className={`relative ${containerWidth}`} onClick={toggleOpen}>
            <button className={`flex ${width} items-center justify-between rounded bg-white p-2 ring-1 ${open ? 'ring-primary' : 'ring-gray-300'}`}>
                <span className='truncate capitalize text-sm max-w-96'>{displayValue()}</span>
                <i className="fas fa-chevron-down text-xl"></i>
            </button>
            {open && (
                <ul className={`z-2 absolute mt-1 ${width} z-[50] max-h-[12rem] overflow-y-auto rounded bg-gray-50 ring-1 ring-gray-300`}>
                    {options.map((item, ind) => (
                        <li
                            key={ind}
                            className="cursor-pointer capitalize truncate text-sm select-none p-2 hover:bg-gray-200"
                            onClick={() => handleSelect(item)}
                        >
                            {chooseOption ? String(item[chooseOption]) : item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectComponent;
