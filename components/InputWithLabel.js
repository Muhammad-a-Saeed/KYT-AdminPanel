const InputWithLabel = ({ label, value, onChange, id, name, disabled, inputWidth, type = "text", placeholder, svgShow, customClassContainer }) => {
    return (
        <div className={`my-1.5 ${customClassContainer}`}>
            <label htmlFor="input" className='text-sm cursor-pointer  text-white font-medium'>{label}</label>
            <div className='flex border border-border_color rounded-md items-center px-2 py-2 bg-white'>
                {svgShow}
                <input
                    id={id}
                    disabled={disabled}
                    onChange={onChange}
                    className={`outline-none focus:outline-none w-full ${inputWidth} text-sm px-2 text-secondary`}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    type={type} />
            </div>
        </div>
    );
};

export default InputWithLabel;