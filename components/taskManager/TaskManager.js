"use client";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
const TaskManager = ({ onTaskCompleted, onTaskRestored }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever the tasks state changes
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== "" && selectedDate !== "" && selectedTime !== "") {
      const task = {
        id: Date.now(),
        text: newTask,
        date: selectedDate,
        time: selectedTime,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setSelectedDate("");
      setSelectedTime("");
    }
  };

  const handleDeleteTask = () => {
    if (selectedTaskId) {
      const deletedTask = tasks.find((task) => task.id === selectedTaskId);

      // Move task to completed tasks
      setCompletedTasks([...completedTasks, deletedTask]);

      // Update the task list
      setTasks(tasks.filter((task) => task.id !== selectedTaskId));
      setSelectedTaskId(null);

      // Notify parent about the completed task
      onTaskCompleted(deletedTask);
    }
  };

  const handleRestoreTask = (restoredTask) => {
    // Move task back to tasks
    setTasks([...tasks, restoredTask]);

    // Remove task from completed tasks
    setCompletedTasks(
      completedTasks.filter((task) => task.id !== restoredTask.id)
    );

    // Notify parent about the restored task
    onTaskRestored(restoredTask);
  };

  // ... (existing code)

  return (
    <div className="container mx-auto p-8">
      <div className="text-3xl font-semibold mb-4">Task Manager</div>

      {/* Add Task Form */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter your task"
          className="flex-grow p-2 mr-2 border rounded-md"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border rounded-md"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <input
          type="time"
          className="p-2 border rounded-md"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddTask}
        >
          <AddIcon /> Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="list-disc pl-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <input
              type="radio"
              name="taskRadio"
              id={`taskRadio_${task.id}`}
              checked={selectedTaskId === task.id}
              onChange={() => setSelectedTaskId(task.id)}
            />
            <label htmlFor={`taskRadio_${task.id}`} className="ml-2">
              {task.text} - {task.date} - {task.time}
            </label>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md ml-4"
              onClick={handleDeleteTask}
            >
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>

      {/* Completed Task List */}
      <div className="mb-4">
        <div className="text-2xl font-semibold mb-2">Completed Tasks</div>
        <ul className="list-disc pl-4">
          {completedTasks.map((task) => (
            <li key={task.id} className="flex items-center mb-2">
              {/* ... (similar to existing code) */}
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md ml-4"
                onClick={() => handleRestoreTask(task)}
              >
                Restore
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
