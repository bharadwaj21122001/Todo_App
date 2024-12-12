import React from "react";
import "./../styles/Filters.css";

const Filters = ({ filter, setFilter }) => {
  return (
    <div className="filters">
      <button onClick={() => setFilter("All")} className={filter === "All" ? "active" : ""}>
        All
      </button>
      <button onClick={() => setFilter("Completed")} className={filter === "Completed" ? "active" : ""}>
        Completed
      </button>
      <button onClick={() => setFilter("Pending")} className={filter === "Pending" ? "active" : ""}>
        Pending
      </button>
    </div>
  );
};

export default Filters;