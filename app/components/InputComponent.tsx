import React from "react";

function InputComponent({
  inputClassName,
  label,
  placeholder,
}: {
  inputClassName: string;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="mb-8">
      <label className="form-control w-full max-w-xs">
        {label ? (
          <div className="label">
            <span className="label-text">{label}</span>
          </div>
        ) : (
          <></>
        )}
        <input
          type="text"
          placeholder={placeholder}
          className={"input input-bordered w-full max-w-xs " + inputClassName}
        />
      </label>
    </div>
  );
}

export default InputComponent;
