export default function Button({ children, color }) {
  return (
    <button className="bg-green-400 hover:bg-green-300 p-2 hover:text-green-900 rounded-md">
      {children}
    </button>
  );
}
