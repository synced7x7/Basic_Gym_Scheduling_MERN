import { useState, useEffect } from "react";

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [certifications, setCertifications] = useState("");
  const [trainerById, setTrainerById] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/trainers")
      .then(res => res.json())
      .then(data => setTrainers(data))
      .catch(err => console.error("Error fetching trainers:", err));
  }, []);


  const handlePostTrainer = () => {
    const name = document.getElementById("trainerNameInput").value;
    const email = document.getElementById("trainerEmailInput").value;
    const specialization = document.getElementById("trainerSp").value;
    const experienceYears = document.getElementById("expYear").value;
    const hourlyRate = document.getElementById("hourlyRate").value;
    const available =
      document.getElementById("available").value === "true";

    if (!name || !email || !specialization || !experienceYears || !hourlyRate) {
      alert("Please fill all fields");
      return;
    }

    const newTrainer = {
      name,
      email,
      specialization: [specialization],
      experienceYears: parseInt(experienceYears),
      hourlyRate: parseInt(hourlyRate),
      available,
      certifications: certifications
        .split(",")
        .map(c => c.trim()),
    };

    fetch("/api/trainers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrainer),
    })
      .then(res => res.json())
      .then(data => {
        setTrainers(prev => [...prev, data]);
        setCertifications("");
      })
      .catch(err => console.error("Error creating trainer:", err));
  };

  const handleGetTrainerById = () => {
    const id = document.getElementById("trainerIdInput").value;

    if (!id) {
      setMessage("No ID provided");
      return;
    }

    fetch(`/api/trainers/${id}`)
      .then(res => res.json())
      .then(data => {
        setTrainerById(data);
        setMessage("");
        document.getElementById("trainerIdInput").value = "";
      })
      .catch(() => {
        setTrainerById(null);
        setMessage("Trainer not found");
      });
  };

  const handleUpdateTrainer = () => {
    const id = document.getElementById("updateTrainerId").value;
    if (!id) return alert("Enter trainer ID");

    const hourlyRate = document.getElementById("updateHourlyRate").value;
    const available =
      document.getElementById("updateAvailable").value === "true";

    const updatedTrainer = {};
    if (hourlyRate) updatedTrainer.hourlyRate = parseInt(hourlyRate);
    updatedTrainer.available = available;

    fetch(`/api/trainers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTrainer),
    })
      .then(res => res.json())
      .then(data => {
        setTrainers(prev =>
          prev.map(t => (t._id === data._id ? data : t))
        );
      })
      .catch(() => alert("No user found"));
  };

  const handleDeleteTrainer = () => {
    const id = document.getElementById("deleteTrainerId").value;
    if (!id) return alert("Enter trainer ID");

    fetch(`/api/trainers/${id}`, { method: "DELETE" })
      .then(() => {
        setTrainers(prev => prev.filter(t => t._id !== id));
      })
      .catch(() => alert("Delete failed"));
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <h2>All Trainers</h2>
      <ul>
        {trainers.map(trainer => (
          <li key={trainer._id}>
            {trainer.name} | {trainer.email} | {trainer.specialization?.join(", ")} | {trainer.hourlyRate} | {trainer.available ? "Available" : "Not Available"} | Certifications: {trainer.certifications?.join(", ") || "None"}
          </li>
        ))}
      </ul>

      <h3>Get Trainer by ID</h3>
      <input id="trainerIdInput" placeholder="Trainer ID" />
      <button onClick={handleGetTrainerById}>Get</button>
      <p>{message}</p>
      {trainerById && <p>{trainerById.name}</p>}

      <h3>Create Trainer</h3>
      <input id="trainerNameInput" placeholder="Name" />
      <input id="trainerEmailInput" placeholder="Email" />
      <select id="trainerSp">
        <option value="yoga">Yoga</option>
        <option value="cardio">Cardio</option>
        <option value="strength">Strength</option>
        <option value="pilates">Pilates</option>
        <option value="crossfit">Crossfit</option>
      </select>
      <input id="expYear" type="number" placeholder="Experience Years" />
      <input id="hourlyRate" type="number" placeholder="Hourly Rate" />
      <select id="available">
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>
      <input
        placeholder="Certifications (comma separated)"
        value={certifications}
        onChange={(e) => setCertifications(e.target.value)}
      />
      <button onClick={handlePostTrainer}>Post Trainer</button>

      <h3>Update Trainer</h3>
      <input id="updateTrainerId" placeholder="Trainer ID" />
      <input id="updateHourlyRate" placeholder="New Hourly Rate" />
      <select id="updateAvailable">
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <button onClick={handleUpdateTrainer}>Update</button>

      <h3>Delete Trainer</h3>
      <input id="deleteTrainerId" placeholder="Trainer ID" />
      <button onClick={handleDeleteTrainer}>Delete</button>
    </div>
  );
}

export default Trainers;
