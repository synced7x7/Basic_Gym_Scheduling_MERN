import { useState, useEffect } from "react";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [singleWorkout, setSingleWorkout] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => console.error("Error fetching workouts:", err));
  }, []);

  const handleCreateWorkout = () => {
    const title = document.getElementById("titleInput").value;
    const reps = document.getElementById("repsInput").value;
    const load = document.getElementById("loadInput").value;
    const difficulty = document.getElementById("difficultyInput").value;

    if (!title || !reps || !load || !difficulty) {
      alert("Please fill all fields");
      return;
    }

    const newWorkout = {
      title,
      reps: parseInt(reps),
      load: parseInt(load),
      difficulty,
    };

    fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout),
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkouts((prev) => [...prev, data]);
        document.getElementById("titleInput").value = "";
        document.getElementById("repsInput").value = "";
        document.getElementById("loadInput").value = "";
        document.getElementById("difficultyInput").value = "medium";
      })
      .catch((err) => console.error(err));
  };

  const handleGetWorkoutById = () => {
    const id = document.getElementById("getWorkoutId").value;

    if (!id) {
      setMessage("Please enter workout ID");
      return;
    }

    fetch(`/api/workouts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleWorkout(data);
        setMessage("");
      })
      .catch(() => {
        setSingleWorkout(null);
        setMessage("No such workout found");
      });
  };

  const handleUpdateWorkout = () => {
    const id = document.getElementById("updateId").value;
    const title = document.getElementById("updateTitle").value;
    const reps = document.getElementById("updateReps").value;
    const load = document.getElementById("updateLoad").value;
    const difficulty = document.getElementById("updateDifficulty").value;

    if (!id) {
      alert("Workout ID required");
      return;
    }

    const updatedWorkout = {};
    if (title) updatedWorkout.title = title;
    if (reps) updatedWorkout.reps = parseInt(reps);
    if (load) updatedWorkout.load = parseInt(load);
    if (difficulty) updatedWorkout.difficulty = difficulty;

    fetch(`/api/workouts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWorkout),
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkouts((prev) => prev.map((w) => (w._id === data._id ? data : w)));
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteWorkout = () => {
    const id = document.getElementById("deleteId").value;

    if (!id) {
      alert("Enter workout ID");
      return;
    }

    fetch(`/api/workouts/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setWorkouts((prev) => prev.filter((w) => w._id !== id));
        document.getElementById("deleteId").value = "";
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <h1>Workouts</h1>

      <h3>All Workouts</h3>
      <ul>
        {workouts.map((w) => (
          <li key={w._id}>
            <b>{w.title}</b> | Reps: {w.reps} | Load: {w.load}kg | Difficulty:{" "}
            {w.difficulty}
          </li>
        ))}
      </ul>

      <h3>Get Workout by ID</h3>
      <input type="text" id="getWorkoutId" placeholder="Workout ID" />
      <button onClick={handleGetWorkoutById}>Get</button>
      <p>{message}</p>
      {singleWorkout && (
        <p>
          {singleWorkout.title} — {singleWorkout.reps} reps
        </p>
      )}

      <h3>Create Workout</h3>
      <input type="text" placeholder="Title" id="titleInput" />
      <input type="number" placeholder="Reps" id="repsInput" />
      <input type="number" placeholder="Load (kg)" id="loadInput" />
      <select id="difficultyInput">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={handleCreateWorkout}>Add Workout</button>

      <h3>Update Workout</h3>
      <input type="text" placeholder="Workout ID" id="updateId" />
      <input type="text" placeholder="Title" id="updateTitle" />
      <input type="number" placeholder="Reps" id="updateReps" />
      <input type="number" placeholder="Load" id="updateLoad" />
      <select id="updateDifficulty">
        <option value="">Select difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={handleUpdateWorkout}>Update</button>

      <h3>Delete Workout</h3>
      <input type="text" placeholder="Workout ID" id="deleteId" />
      <button onClick={handleDeleteWorkout}>Delete</button>
    </div>
  );
}

export default Workouts;
