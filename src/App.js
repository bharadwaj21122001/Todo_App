import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import { FaMoon, FaSun } from "react-icons/fa"; // Import the icons from react-icons
import "./styles/App.css";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [filter, setFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if Dark Mode preference is saved in localStorage
    return localStorage.getItem("dark-mode") === "true";
  });

  useEffect(() => {
    // Apply the Dark Mode class to the body element
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    // Save Dark Mode preference in localStorage
    localStorage.setItem("dark-mode", isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (id, updates) =>
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const filteredTasks = tasks.filter((task) => {
    const filterCondition =
      filter === "All" ||
      (filter === "Completed" && task.completed) ||
      (filter === "Pending" && !task.completed);

    const priorityCondition =
      priorityFilter === "All" || task.priority === priorityFilter;

    return filterCondition && priorityCondition;
  });

  return (
    <div className="app">
      <div className="header">
        <h1>To-Do App</h1>
        <button
          onClick={() => setIsDarkMode((prevMode) => !prevMode)}
          className="dark-mode-toggle"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />} {/* Display the appropriate icon */}
        </button>
      </div>
      <div className="content">
        <div className="left-pane">
          <AddTask onAddTask={addTask} />
        </div>
        <div className="right-pane">
          <div className="filters-container">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <TaskList
            tasks={filteredTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default App;