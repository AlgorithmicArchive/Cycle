import React from "react";

export const InputField = ({
  iconClass,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  errorMsg,
  checkFunction,
}) => {
  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <i className={`fas ${iconClass} w-4 h-4 opacity-70`}></i>
        <input
          type={type}
          className="grow"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      {errorMsg && (
        <span className="text-red-800 text-sm font-bold text-center whitespace-pre-line">
          {errorMsg}
        </span>
      )}
    </>
  );
};
