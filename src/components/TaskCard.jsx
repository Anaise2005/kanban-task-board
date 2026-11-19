import { Link } from "react-router-dom";

function TaskCard({ task, moveTask, deleteTask, archiveTask }) {

  return (
    <div className="task-card">

      <div className="task-card-header">

        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <button
          className="delete-button"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>

      </div>

      <Link to={`/task/${task.id}`} className="task-link">

        <h3>{task.title}</h3>
        <p>{task.description}</p>

      </Link>

      <div className="task-card-footer">

        <label>Move task:</label>

        <select
          value={task.status}
          onChange={(e) => moveTask(task.id, e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          className="archive-button"
          onClick={() => archiveTask(task.id)}
        >
          Archive Task
        </button>

      </div>

    </div>
  );
}

export default TaskCard;