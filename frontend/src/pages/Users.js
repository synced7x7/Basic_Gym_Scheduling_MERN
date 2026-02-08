import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [userById, setUserById] = useState(null);
  const [userByIdMessage, setUserByIdMessage] = useState("");

  const handleGetUser = () => {
    const userId = document.getElementById("userIdInput").value;
    if (!userId) {
      setUserById(null);
      setUserByIdMessage("No id found.");
      return;
    }
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserById(data);
        setUserByIdMessage("");
      })
      .catch((error) => {
        console.error("Error fetching user by ID:", error);
        setUserById(null);
        setUserByIdMessage("No id found.");
      });
  };

  const handlePostUser = () => {
    const name = document.getElementById("userNameInput").value;
    const email = document.getElementById("userEmailInput").value;
    const age = document.getElementById("userAgeInput").value;

    if (!name || !email || !age) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      name,
      email,
      age: parseInt(age),
      membershipType: "basic",
      active: true,
      joinDate: new Date().toISOString(),
    };

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, data]);
        document.getElementById("userNameInput").value = "";
        document.getElementById("userEmailInput").value = "";
        document.getElementById("userAgeInput").value = "";
      })
      .catch((error) => console.error("Error posting new user:", error));
  };

  const handleUpdateUser = () => {
    const userId = document.getElementById("updateUserIdInput").value;
    if (!userId) {
      console.error("No user ID provided for update.");
      return;
    }
    const name = document.getElementById("updateUserNameInput").value;
    const email = document.getElementById("updateUserEmailInput").value;
    const age = document.getElementById("updateUserAgeInput").value;
    const active =
      document.getElementById("updateUserActiveInput").value === "true";
    const membershipType = document.getElementById(
      "updateUserMembershipInput",
    ).value;

    const updatedUser = {};
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (age) updatedUser.age = parseInt(age);
    if (membershipType) updatedUser.membershipType = membershipType;
    updatedUser.active = active;

    fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === data._id ? data : user)),
        );
        document.getElementById("updateUserIdInput").value = "";
        document.getElementById("updateUserNameInput").value = "";
        document.getElementById("updateUserEmailInput").value = "";
        document.getElementById("updateUserAgeInput").value = "";
        document.getElementById("updateUserActiveInput").value = "true";
        document.getElementById("updateUserMembershipInput").value = "basic";
      })
      .catch((error) => alert("Cannot find User", error));
  };

  const handleDeleteUser = () => {
    const userId = document.getElementById("deleteUserIdInput").value;

    if (!userId) {
      alert("Please enter user ID");
      return;
    }

    fetch(`/api/users/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        document.getElementById("deleteUserIdInput").value = "";
      })
      .catch((error) => alert("Cannot find User: " + error));
  };

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div style={{ marginLeft: "20px" }}>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Name: {user.name}, Email: {user.email}, Age: {user.age}, Membership:{" "}
            {user.membershipType}, Joined:{" "}
            {new Date(user.joinDate).toLocaleDateString()}, Active:
            {user.active ? "Yes" : "No"}
          </li>
        ))}
      </ul>
      <h2>Get User by Id</h2>
      <input type="text" placeholder="Enter user ID" id="userIdInput" />
      <button onClick={handleGetUser}>Get User</button>
      <p>{userByIdMessage}</p>
      {userById && (
        <p>
          {userById.name} ({userById.email})
        </p>
      )}

      <h2> Post User </h2>
      <input type="text" placeholder="Enter user name" id="userNameInput" />
      <input type="text" placeholder="Enter user email" id="userEmailInput" />
      <input type="number" placeholder="Enter user age" id="userAgeInput" />
      <button onClick={handlePostUser}>Post User</button>

      <h2> Update User by Id</h2>
      <div>
        <section>
          <input
            type="text"
            placeholder="Enter user id"
            id="updateUserIdInput"
          />
          <input
            type="text"
            placeholder="Enter user name"
            id="updateUserNameInput"
          />
          <input
            type="text"
            placeholder="Enter user email"
            id="updateUserEmailInput"
          />
          <input
            type="number"
            placeholder="Enter user age"
            id="updateUserAgeInput"
          />
        </section>
        <section>
          <select id="updateUserActiveInput">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <select id="updateUserMembershipInput">
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="elite">Elite</option>
          </select>
        </section>
        <div>
          <button onClick={handleUpdateUser}>Update User</button>
        </div>
      </div>

      <h2>Delete User by Id</h2>
      <div>
        <input type="text" placeholder="Enter user id" id="deleteUserIdInput" />
        <button onClick={handleDeleteUser}>Delete User</button>
      </div>
    </div>
  );
}

export default Users;

/* Key concepts
useState	Store data
useEffect	Run code when page loads
fetch	Call backend API */

//map() = array method to loop through each item and return JSX for it
