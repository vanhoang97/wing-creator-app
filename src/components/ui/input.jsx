export function Input({ value, onChange, placeholder }) {
    return (
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    );
  }
  