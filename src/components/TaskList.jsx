import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask, fetchTodo } from "../features/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks = [], loading, error } = useSelector((state) => state.tasks);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  // Add new task
  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      description: "",
      status: "To Do",
    };
    dispatch(editTask(newTask)); // We'll treat this as "add or edit" in slice
    setNewTaskTitle("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    const newTitle = prompt("Edit task title:", task.title);
    if (newTitle && newTitle.trim() !== "") {
      dispatch(editTask({ ...task, title: newTitle.trim() }));
    }
  };

  if (loading)
    return (
      <div className="text-center text-lg font-semibold mt-6">
        Loading tasks...
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-6">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-6">
      {/* Add Task Area */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500">No tasks available</div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border"
          >
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(task)}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
