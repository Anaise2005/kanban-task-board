function FilterBar({
  searchTerm,
  setSearchTerm,
  priority,
  setPriority
}) {

  return (
    <div className="filter-bar">

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="priority-buttons">

        <button
          className={priority === "All" ? "active" : ""}
          onClick={() => setPriority("All")}
        >
          All
        </button>

        <button
          className={priority === "High" ? "active" : ""}
          onClick={() => setPriority("High")}
        >
          High
        </button>

        <button
          className={priority === "Medium" ? "active" : ""}
          onClick={() => setPriority("Medium")}
        >
          Medium
        </button>

        <button
          className={priority === "Low" ? "active" : ""}
          onClick={() => setPriority("Low")}
        >
          Low
        </button>

      </div>

    </div>
  );
}

export default FilterBar;