import React, { useState } from "react";

const ToggleButton = ({ initialValue = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  const handleClick = (value) => {
    if (isChecked !== value) {
      setIsChecked(value);
      onChange(value);
    }
  };

  return (
    <div className="relative inline-flex text-sm">
      <button
        onClick={() => handleClick(false)}
        className={`relative transform cursor-pointer rounded-ss-xl border-2 border-slate-900 px-3 py-1 transition-all duration-500 ${
          isChecked
            ? "bg-transparent text-slate-900"
            : "bg-slate-900 text-white"
        }`}
      >
        Écoles
      </button>
      <button
        onClick={() => handleClick(true)}
        className={`relative -ml-1 transform cursor-pointer rounded-ee-xl border-2 border-slate-900 px-3 py-1 transition-all duration-500 ${
          isChecked
            ? "bg-slate-900 text-white"
            : "bg-transparent text-slate-900"
        }`}
      >
        Techniques
      </button>
    </div>
  );
};

export default ToggleButton;
