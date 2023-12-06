import TodoApp from "@/components/TodoApp";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <TodoApp />
      </div>
    </div>
  );
}
