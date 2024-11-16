import { forwardRef } from "react";
const Input = forwardRef(function Input({ id, label, ...props }, ref) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        {...props}
        name={id}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
});

export default Input;
