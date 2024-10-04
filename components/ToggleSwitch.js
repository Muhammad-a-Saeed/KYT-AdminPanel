import { useState } from 'react';

const ToggleSwitch = ({ value = false,isLabel = true }) => {
    const [checked, setChecked] = useState(value);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <label className="flex items-center relative w-max cursor-pointer select-none">
            <input
                type="checkbox"
                className={`appearance-none border transition-colors cursor-pointer ${checked && "bg-primary"} w-[3.2rem] h-6 rounded-full outline-none `}
                checked={checked}
                onChange={handleChange}
            />
            {isLabel && checked && <span className="absolute font-medium text-[0.65rem] left-1 text-white"> Yes </span>}
            {isLabel && !checked && <span className="absolute font-medium text-[0.65rem] uppercase right-1 text-black"> ON </span>}
            <span className={`w-4 h-4 left-1 absolute rounded-full transform transition-transform  ${checked ? 'translate-x-7 bg-white' : 'bg-gray-200'}`} />

        </label>
    );
};

export default ToggleSwitch;
