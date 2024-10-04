import React from "react";

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  type,
  name
}) => {
  return (
    <div style={{ display: "Flex", flexDirection: "column" }}>
      <label
        style={{
          color: "#5A5A5A",
          fontSize: "20px",
          fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        {label}
      </label>
      <input
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "white",
          border: "1px solid #0000001A",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px 0px #0000001A",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        type={type}
      />
    </div>
  );
};

export default InputField;
