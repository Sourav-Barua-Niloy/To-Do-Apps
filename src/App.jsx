import TaskList from "./components/TaskList";

function App() {
  return (
    // <div className="max-w-xl mx-auto mt-10">
    <div className="container bg-white mt-5 p-4">
      <h1 className="text-3xl font-bold mb-5">Redux Todo App</h1>

      <TaskList></TaskList>
    </div>
  );
}

export default App;
