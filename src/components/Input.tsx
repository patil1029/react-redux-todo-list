import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>  {
  id: string,
  label?:string,
}


const Input:React.FC<InputProps> = ({ id, label, ...props }) => {
  
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}

export default Input;
