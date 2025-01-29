import { useState } from "react";
import "./App.css"; // Import CSS file

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  // Add a new task
  function addTask(event) {
    event.preventDefault();
    if (taskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      status: "To Do",
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  }

  // Delete a task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Move a task to a new status
  function moveTask(id, newStatus) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Task Input Form */}
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task..."
        />
        <button type="submit">Add</button>
      </form>

      {/* Task Board */}
      <div className="task-board">
        {["To Do", "In Progress", "Done"].map((status) => (
          <div key={status} className="task-column">
            <h2>{status}</h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className="task">
                  <span>{task.text}</span>
                  <div className="task-buttons">
                    {status !== "To Do" && (
                      <button onClick={() => moveTask(task.id, "To Do")}>
                        ⬅️
                      </button>
                    )}
                    {status !== "In Progress" && (
                      <button onClick={() => moveTask(task.id, "In Progress")}>
                        🔄
                      </button>
                    )}
                    {status !== "Done" && (
                      <button onClick={() => moveTask(task.id, "Done")}>
                        ✔️
                      </button>
                    )}
                    <button onClick={() => deleteTask(task.id)}>❌</button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
