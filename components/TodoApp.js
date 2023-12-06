"use client";
import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return storedTasks;
  });
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Save tasks to localStorage whenever tasks are updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingText(taskToEdit.text);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editingText } : task
      )
    );
    setEditingTaskId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingText("");
  };

  const markComplete = () => {
    setTasks(tasks.map((task) => ({ ...task, completed: true })));
  };

  const markIncomplete = () => {
    setTasks(tasks.map((task) => ({ ...task, completed: false })));
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>

      <div className="mb-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTask}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`mb-2 p-2 border ${
              task.completed ? "bg-green-100" : "bg-white"
            } flex items-center justify-between`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
                className="mr-2"
              />
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <span className={task.completed ? "line-through" : ""}>
                  {task.text}
                </span>
              )}
            </div>
            <div>
              {editingTaskId === task.id ? (
                <>
                  <button onClick={saveEdit} className="text-green-500 mr-2">
                    Save
                  </button>
                  <button onClick={cancelEdit} className="text-red-500">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => editTask(task.id)} className="mr-2">
                  Edit
                </button>
              )}
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <button
          onClick={markComplete}
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          Mark Complete
        </button>
        <button
          onClick={markIncomplete}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          Mark Incomplete
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
