import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Persons = () => {
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch persons from the backend
    axios
      .get("http://localhost:8000/api/persons/")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the persons data!", error);
      });
  }, []);

  return (
    <div>
      <h2>Persons List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.Name}</td>
              <td>{person.PhoneNumber}</td>
              <td>
                {/* Add navigation to person details page */}
                <button
                  onClick={() => navigate(`/person-details/${person.id}`)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
