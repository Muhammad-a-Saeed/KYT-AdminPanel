import { Eye_Off_SVG, Eye_On_SVG, Password_SVG } from '@/utils/svgGrabber'
import React, { useState } from 'react'

const PasswordInput = ({ onChange, value }) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <label htmlFor="input" className='text-sm cursor-pointer font-medium  text-white'>Password</label>
            <div className='flex border border-border_color rounded-md items-center px-2 py-2 bg-white'>
                <Password_SVG />
                <input
                    id='input'
                    className='outline-none focus:outline-none w-full text-sm px-2 text-secondary'
                    placeholder='**********'
                    type={show ? "text" : "password"}
                    onChange={onChange}
                    value={value}
                />
                {!show && <Eye_On_SVG onclick={() => setShow(true)} />}
                {show && <Eye_Off_SVG onclick={() => setShow(false)} />}
            </div>
        </div>
    )
}

export default PasswordInput
