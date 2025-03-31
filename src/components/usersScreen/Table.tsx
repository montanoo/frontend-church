export function Table({ children }: { children: React.ReactNode }) {
    return <table className="w-full border-collapse border border-gray-300">{children}</table>;
  }
  
  export function TableHead({ children }: { children: React.ReactNode }) {
    return <thead className="bg-gray-100">{children}</thead>;
  }
  
  export function TableRow({ children }: { children: React.ReactNode }) {
    return <tr className="text-center">{children}</tr>;
  }
  
  export function TableCell({ children }: { children: React.ReactNode }) {
    return <td className="border p-2">{children}</td>;
  }
  
  export function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>;
  }
  