import React from "react";

interface InputProps {
  type?: React.HTMLInputTypeAttribute | undefined;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  value: string | number | readonly string[] | undefined;
  placeholder: string;
  label: string;
  errors: string | undefined;
  touched: boolean | undefined;
}

const Input = ({
  type,
  name,
  onChange,
  onBlur,
  value,
  placeholder,
  label,
  errors,
  touched,
}: InputProps) => {
  return (
    <div className="mb-3">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        className="focus:shadow-outline mb-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
      ></input>
      {errors && touched && (
        <p className="text-xs italic text-red-500">{errors}</p>
      )}
    </div>
  );
};

export default Input;
