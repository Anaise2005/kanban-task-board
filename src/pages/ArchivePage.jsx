import { Link } from "react-router-dom";

function ArchivePage({ tasks, restoreTask, deleteTask }) {

  const archivedTasks = tasks.filter(
    (task) => task.status === "done" || task.archived
  );

  return (
    <div className="page-container">

      <header className="navbar">

        <h1>TaskFlow</h1>

        <nav>
          <Link to="/">Board</Link>
          <Link to="/archive">Archive</Link>
        </nav>

      </header>

      <section className="archive-section">

        <h2>Completed and Archived Tasks</h2>

        <p>Here you can view your completed and archived tasks.</p>

        {archivedTasks.length === 0 ? (

          <p className="empty-message">
            No completed or archived tasks.
          </p>

        ) : (

          <div className="archive-list">

            {archivedTasks.map((task) => (

              <div className="archive-card" key={task.id}>

                <div className="archive-information">

                  <h3>{task.title}</h3>

                  <p>{task.description}</p>

                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>

                  <span className="task-status">
                    {task.archived ? "Archived" : "Completed"}
                  </span>

                </div>

                <div className="archive-actions">

                  <button onClick={() => restoreTask(task.id)}>
                    Restore
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        <Link to="/" className="back-link">
          Back to Board
        </Link>

      </section>

    </div>
  );
}

export default ArchivePage;