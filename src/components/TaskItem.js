import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./../styles/TaskItem.css";

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
  });

  const toggleComplete = () => onUpdateTask(task.id, { completed: !task.completed });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onUpdateTask(task.id, { ...task, ...editedTask });
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {!isEditing ? (
        <>
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
            <button onClick={handleEditToggle} className="icon-button">
              <FaEdit />
            </button>
            <button onClick={() => onDeleteTask(task.id)} className="icon-button">
              <FaTrash />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="task-details">
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              placeholder="Edit Title"
            />
            <textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              placeholder="Edit Description"
            />
            <input
              type="date"
              value={editedTask.dueDate}
              onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              placeholder="Edit Due Date"
            />
            <select
              value={editedTask.priority}
              onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="task-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleEditToggle}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;