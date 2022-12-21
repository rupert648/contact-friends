import React from "react";

interface DateInputProps {
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  value: string | number | readonly string[] | undefined;
  label: string;
  errors: string | undefined;
  touched: boolean | undefined;
}

const DateInput = ({
  name,
  onChange,
  onBlur,
  value,
  label,
  errors,
  touched,
}: DateInputProps) => {
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
        type="date"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      ></input>
      {errors && touched && (
        <p className="text-xs italic text-red-500">{errors}</p>
      )}
    </div>
  );
};

export default DateInput;
