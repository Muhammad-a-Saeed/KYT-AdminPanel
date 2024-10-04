import { Option_SVG } from '@/utils/svgGrabber';
import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ isEdit = false, onActionSelect }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    const handleScroll = () => {
        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleActionClick = (action) => {
        if (onActionSelect) {
            onActionSelect(action);
        }
        setOpen(false);
    };

    return (
        <div className='relative w-full' ref={dropdownRef}>
            <button
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="focus:outline-none"
            >
                <Option_SVG />
            </button>
            {open && (
                <div className="shadow-dropDown w-28 bg-white absolute right-2 z-50 rounded-xl">
                    {isEdit ? (
                        <>
                            <button
                                className='hover:bg-table_row_hover rounded-t-xl px-5 whitespace-nowrap py-2 w-full text-left'
                                onClick={() => handleActionClick("approved")}
                            >
                                Approved
                            </button>
                            <button
                                className='hover:bg-table_row_hover px-5 py-2 w-full text-left'
                                onClick={() => handleActionClick("rejected")}
                            >
                                Rejected
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className='hover:bg-table_row_hover rounded-t-xl px-5 whitespace-nowrap py-2 w-full text-left'
                                onClick={() => handleActionClick('Edit')}
                            >
                                Edit
                            </button>
                            <button
                                className='text-danger rounded-b-xl hover:bg-table_row_hover px-5 py-2 w-full text-left'
                                onClick={() => handleActionClick('Delete')}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
