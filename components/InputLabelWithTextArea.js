import { ADD } from '@/utils/svgGrabber'
import React from 'react'

const InputLabelWithTextArea = ({ label = "", rows = 3, handleAdd, value, inputPlaceHolder = "", type = "text", custom, onchange, name, showAddSVG = true, customContainer = "" }) => {
    return (
        <div className={`w-full ${customContainer}`}>
            <div className={`text-sm font-medium ${custom}`}>{label}</div>
            <div className='w-full flex gap-2 items-center'>
                <textarea rows={rows} onKeyDown={(e) => {
                    if (e.code === "Enter" && handleAdd) handleAdd()
                }} type={type} name={name} value={value} onChange={onchange} className='py-1.5 !w-full px-3 placeholder:text-sm  outline-none border-gray-300 border rounded-md' placeholder={inputPlaceHolder} />
                {showAddSVG && <div className='cursor-pointer'>
                    <ADD onclick={handleAdd} />
                </div>}
            </div>
        </div>
    )
}

export default InputLabelWithTextArea
