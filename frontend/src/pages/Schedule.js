import { useEffect, useState } from "react";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/schedule")
      .then((res) => res.json())
      .then((data) => setSchedules(data))
      .catch((err) => console.error("Error fetching schedules:", err));
  }, []);

  const handleScheduleWorkout = () => {
    const userId = document.getElementById("userId").value;
    const trainerId = document.getElementById("trainerId").value;
    const workoutTypes = document
      .getElementById("workoutTypes")
      .value.split(",")
      .map((w) => w.trim());
    const scheduledAt = document.getElementById("scheduledAt").value;
    const notes = document.getElementById("notes").value;

    if (!userId || !trainerId || !workoutTypes.length || !scheduledAt) {
      alert("Please fill all required fields!");
      return;
    }

    const newSchedule = { userId, trainerId, workoutTypes, scheduledAt, notes };

    fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSchedule),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Scheduled workout:", data);
        setMessage(data.message || "Workout scheduled successfully");
        setSchedules((prev) => [...prev, data.workout]);

        document.getElementById("userId").value = "";
        document.getElementById("trainerId").value = "";
        document.getElementById("workoutTypes").value = "";
        document.getElementById("scheduledAt").value = "";
        document.getElementById("notes").value = "";
      })
      .catch((err) => {
        alert("Error scheduling workout:", err);
        setMessage("Error scheduling workout");
      });
  };

  return (
    <div>
      <h1>Schedule Page</h1>
      <div>
        <h2>All Scheduled Workouts</h2>
        <ul>
          {schedules.map((s) => (
            <li key={s._id}>
              User: {s.user} | Trainer: {s.trainer} | Types:{" "}
              {s.workoutTypes.join(", ")} | Scheduled At:{" "}
              {new Date(s.scheduledAt).toLocaleString()} | Status: {s.status} |
              Notes: {s.notes || "None"}
            </li>
          ))}
        </ul>
      </div>

      <input type="text" id="userId" placeholder="Enter User Id" />
      <input type="text" id="trainerId" placeholder="Enter Trainer Id" />
      <input
        type="text"
        id="workoutTypes"
        placeholder="Enter Workout Types (comma separated)"
      />
      <input
        type="datetime-local"
        id="scheduledAt"
        placeholder="Select Date and Time"
      />
      <input type="text" id="notes" placeholder="Additional Notes" />
      <button onClick={handleScheduleWorkout}>Schedule Workout</button>
    </div>
  );
}

export default Schedule;
