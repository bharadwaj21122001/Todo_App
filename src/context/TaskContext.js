import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create a context
const TaskContext = createContext();

// Reducer function to manage task-related state
const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload.id);
    case "SET_TASKS":
      return action.payload;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// TaskProvider component to wrap the app and provide task state
export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
