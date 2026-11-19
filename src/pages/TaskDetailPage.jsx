import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function TaskDetailPage({ tasks, updateTask, deleteTask }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((item) => item.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  useEffect(() => {

    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }

  }, [task]);

  if (!task) {
    return (
      <div className="detail-page">
        <h2>Task not found!</h2>
        <Link to="/">Return to Board</Link>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    updateTask(id, {
      title,
      description,
      status
    });

    navigate("/");
  }

  function handleDelete() {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      deleteTask(id);
      navigate("/");
    }
  }

  return (
    <div className="detail-page">

      <div className="detail-card">

        <h1>Edit Task</h1>

        <form onSubmit={handleSubmit}>

          <label>Task Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Task Description</label>

          <textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Task Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button type="submit" className="save-button">
            Save Changes
          </button>

        </form>

        <button
          onClick={handleDelete}
          className="delete-full-button"
        >
          Delete Task
        </button>

        <Link to="/" className="back-link">
          Back to Board
        </Link>

      </div>

    </div>
  );
}

export default TaskDetailPage;