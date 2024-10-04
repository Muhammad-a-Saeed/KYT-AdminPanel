import { Delete_SVG } from "@/utils/svgGrabber";
import React from "react";

const TextAreaWithList = ({ array, value, label,custom, showList = true, handleAdd, name, onchange, handleDelete }) => {
    return (
        <div className='flex flex-col w-full'>
            <h1 className={`text-sm font-semibold my-3 ${custom}`}>{label}</h1>
            <textarea
                onKeyDown={(e) => {
                    if (!value?.trim().length) return
                    if (e.code === "Enter" && handleAdd) return handleAdd(name);
                }}
                value={value}
                name={name}
                onChange={onchange}
                id="warning" rows={5}
                className='border outline-none p-2 border-gray-300 rounded-md'></textarea>
            {showList && <div className='text-end'>
                <button onClick={handleAdd} className='border-2 border-gray-400 rounded-md mt-2 py-1 px-2 gap-1 text-sm flex ml-auto w-fit'>+Add</button>
            </div>}
            {showList && <div>
                {array?.map((item, index) => (
                    <div key={index} className='flex select-none gap-2 items-center'>
                        <div className='border p-2 rounded-md my-2 text-sm w-[92%]'>{item}</div>
                        <Delete_SVG onclick={() => handleDelete(item)} />
                    </div>
                ))}
            </div>}
        </div>
    );
};
export default TextAreaWithList