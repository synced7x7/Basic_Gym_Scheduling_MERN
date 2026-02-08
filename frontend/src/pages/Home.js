import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to year 1888 gym</h1>

      <nav>
        <div style={{ marginLeft: "20px" }}>
          <div>
            <Link to="/users">Users</Link>
          </div>
          <div>
            <Link to="/trainers">Trainers</Link>
          </div>
          <div>
            <Link to="/workouts">Workouts</Link>
          </div>
          <div>
            <Link to="/schedule">Schedule</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Home;
