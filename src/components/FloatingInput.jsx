const FloatingInput = ({ label, name, onChange }) => (
  <label className="relative block focus-within:[&>span]:-top-2.5 cursor-pointer">
    <input
      name={name}
      placeholder=" "
      onChange={onChange}
      className="px-3 py-2 my-1 border-b-2 border-b-blue-500 w-full peer focus:outline-none cursor-pointer"
    />
    <span className="absolute top-3.5 left-3 transition-all duration-200 peer-not-placeholder-shown:-top-2.5 text-gray-600">
      {label}
    </span>
  </label>
);

export default FloatingInput