export function Card({ children }) {
    return <div className="border rounded-lg shadow p-4 bg-white">{children}</div>;
  }
  
  export function CardContent({ children, className = "" }) {
    return <div className={`mt-2 ${className}`}>{children}</div>;
  }
  