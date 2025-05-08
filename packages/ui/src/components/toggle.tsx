import React from "react";

type Props = {
  value: boolean;
};

export const Toggle = ({ value }: Props) => {
  return (
    <div
      className={`bg-green rounded-r-full rounded-l-full w-16 h-8 flex items-center p-1 cursor-pointer ${
        value ? "bg-green-400" : "bg-gray-200"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
          value ? "translate-x-8" : ""
        }`}
      ></div>
    </div>
  );
};
