export function Textarea({ value, onChange, placeholder, rows = 4, readOnly = false }) {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        readOnly={readOnly}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    );
  }
  