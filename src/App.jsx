import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import initialTasks from "./data/initialTasks";
import useLocalStorage from "./hooks/useLocalStorage";

import BoardPage from "./pages/BoardPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import ArchivePage from "./pages/ArchivePage";

import "./App.css";

function App() {

  // Global task state
  const [tasks, setTasks] = useLocalStorage("kanban_tasks", []);

  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading and initial task loading
  useEffect(() => {

    const savedTasks = localStorage.getItem("kanban_tasks");

    if (savedTasks !== null) {

      try {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)&& parsedTasks.length > 0) {
          setIsLoading(false);
          return;
        }

      } catch (error) {
        console.error("Invalid saved tasks:", error);
      }

    }

    const timer = setTimeout(() => {

      setTasks(initialTasks);
      setIsLoading(false);

    }, 400);

    return () => clearTimeout(timer);

  }, [setTasks]);

  // ADD TASK
  function addTask(taskData) {

    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      status: "todo",
      priority: taskData.priority,
      archived: false
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask
    ]);
  }

  // MOVE TASK
  function moveTask(id, newStatus) {

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus, archived: false }
          : task
      )
    );
  }

  // UPDATE TASK
  function updateTask(id, updatedData) {

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedData }
          : task
      )
    );
  }

  // DELETE TASK
  function deleteTask(id) {

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  // ARCHIVE TASK
  function archiveTask(id) {

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, archived: true }
          : task
      )
    );
  }

  // RESTORE TASK
  function restoreTask(id) {

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              archived: false,
              status: task.status === "done" ? "todo" : task.status
            }
          : task
      )
    );
  }

  // Loading screen
  if (isLoading) {

    return (
      <div className="loading-screen">

        <div className="spinner"></div>

        <h2>Loading Kanban Board...</h2>

      </div>
    );
  }

  return (

    <BrowserRouter>

      <Routes>

        {/* Main Board Page */}
        <Route
          path="/"
          element={
            <BoardPage
              tasks={tasks}
              addTask={addTask}
              moveTask={moveTask}
              deleteTask={deleteTask}
              archiveTask={archiveTask}
            />
          }
        />

        {/* Task Details Page */}
        <Route
          path="/task/:id"
          element={
            <TaskDetailPage
              tasks={tasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          }
        />

        {/* Archive Page */}
        <Route
          path="/archive"
          element={
            <ArchivePage
              tasks={tasks}
              restoreTask={restoreTask}
              deleteTask={deleteTask}
            />
          }
        />

        {/* Unknown Page */}
        <Route
          path="*"
          element={
            <div className="not-found">
              <h1>404 - Page Not Found</h1>
              <a href="/">Return to Board</a>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;