import React from "react";

export default function BmiBar({
  labelWithGrandeur,
  value,
  setValue,
  min,
  max,
}) {
  const valueHandler = (setState, min, max) => (e) => {
    const { value } = e.target;
    if (value >= min && value <= max) {
      setState(value);
    }
    if (value < min) {
      setState(min);
    }
    if (value > max) {
      setState(max);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-lg text-center">{labelWithGrandeur}</h1>
      <div className="flex justify-between">
        <h1 className="text-xl">{min}</h1>
        <input
          type="number"
          value={value}
          onChange={valueHandler(setValue, min, max)}
          min={min}
          max={max}
          className="input w-fit text-center text-2xl focus:outline-none"
        />
        <h1 className="text-xl">{max}</h1>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="range range-md"
        onChange={valueHandler(setValue, min, max)}
      />
    </div>
  );
}
