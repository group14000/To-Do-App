"use client";
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever the tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

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
            <span className="flex-grow">{task.text}</span>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md"
              onClick={() => handleDeleteTask(task.id)}
            >
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
