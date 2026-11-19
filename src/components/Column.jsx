import TaskCard from "./TaskCard";

function Column({
  title,
  status,
  tasks,
  moveTask,
  deleteTask,
  archiveTask
}) {

  const columnTasks = tasks.filter(
    (task) => task.status === status && !task.archived
  );

  return (
    <div className="column">

      <div className="column-header">
        <h2>{title}</h2>
        <span>{columnTasks.length}</span>
      </div>

      <div className="column-tasks">

        {columnTasks.length === 0 ? (
          <p className="empty-message">No tasks available.</p>
        ) : (

          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              moveTask={moveTask}
              deleteTask={deleteTask}
              archiveTask={archiveTask}
            />
          ))

        )}

      </div>

    </div>
  );
}

export default Column;