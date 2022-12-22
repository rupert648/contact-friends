import React from "react";

interface ButtonProps {
  children: JSX.Element[] | JSX.Element | string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="mx-4 rounded-md bg-orange-500 py-1 px-1 text-sm text-white hover:bg-orange-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
