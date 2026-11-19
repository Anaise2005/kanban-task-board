import { useState } from "react";
import { Link } from "react-router-dom";

import Column from "../components/Column";
import FilterBar from "../components/FilterBar";
import useTaskFilter from "../hooks/useTaskFilter";

function BoardPage({
  tasks,
  addTask,
  moveTask,
  deleteTask,
  archiveTask
}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("All");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");

  const activeTasks = tasks.filter((task) => !task.archived);

  const filteredTasks = useTaskFilter(
    activeTasks,
    searchTerm,
    priority
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    addTask({
      title,
      description,
      priority: newPriority
    });

    setTitle("");
    setDescription("");
    setNewPriority("Medium");
  }

  return (
    <div className="page-container">

      <header className="navbar">

        <h1>TaskFlow</h1>

        <nav>
          <Link to="/">Board</Link>
          <Link to="/archive">Archive</Link>
        </nav>

      </header>

      <section className="welcome-section">

        <div>
          <h2>My Kanban Board</h2>
          <p>Manage your tasks and track your progress.</p>
        </div>

        <div className="task-total">
          Total Tasks: {activeTasks.length}
        </div>

      </section>

      <section className="add-task-section">

        <h2>Add New Task</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <button type="submit">
            + Add Task
          </button>

        </form>

      </section>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priority={priority}
        setPriority={setPriority}
      />

      <section className="board">

        <Column
          title="To Do"
          status="todo"
          tasks={filteredTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          archiveTask={archiveTask}
        />

        <Column
          title="In Progress"
          status="progress"
          tasks={filteredTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          archiveTask={archiveTask}
        />

        <Column
          title="Done"
          status="done"
          tasks={filteredTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          archiveTask={archiveTask}
        />

      </section>

    </div>
  );
}

export default BoardPage;