import React from "react";
import "./../styles/TaskItem.css";

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const toggleComplete = () => onUpdateTask(task.id, { completed: !task.completed });

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        {task.dueDate && <p>Due: {task.dueDate}</p>}
        <p>Priority: {task.priority}</p>
      </div>
      <div className="task-actions">
        <button onClick={toggleComplete}>
          {task.completed ? "Mark Pending" : "Mark Complete"}
        </button>
        <button onClick={() => onDeleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;