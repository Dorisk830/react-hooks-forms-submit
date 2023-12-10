import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function Form() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Henry");
  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState([]);
  
  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate form data
    if (firstName.trim() === "") {
      setErrors(["First name is required!"]);
      return;
    }

    // Create a new item
    const newItem = {
      id: uuid(),
      firstName: firstName,
      lastName: lastName,
    };

    // Update state with the new item
    setSubmittedData((prevData) => [...prevData, newItem]);

    // Clear form fields and errors
    setFirstName("");
    setLastName("");
    setErrors([]);
  }

  const listOfSubmissions = submittedData.map((data) => (
    <div key={data.id}>
      {data.firstName} {data.lastName}
    </div>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleFirstNameChange} value={firstName} />
        <input type="text" onChange={handleLastNameChange} value={lastName} />
        <button type="submit">Submit</button>
      </form>
      {/* conditionally render error messages */}
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}
      <h3>Submissions</h3>
      {listOfSubmissions}
    </div>
  );
}

export default Form;
