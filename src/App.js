import React, { useState } from "react";
import "./App.css";
import yinyang from "./yinyang.png";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [dob, setDOB] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    selectedBatch: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    if (!(dob === null || dob === "")) {
      console.log(dob);
      setFormData({ ...formData, age: calculateAge(dob) });
    } else {
      setFormData({ ...formData, age: "" });
    }
  }

  const calculateAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    if (birthDate > today) return "";
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(age_now);
    return age_now;
  };

  const handleSubmit = async (e) => {
    alert(
      "A form was submitted with following details:-\n\nName: " +
        formData.name +
        "\nAge: " +
        formData.age +
        "\nEmail: " +
        formData.email +
        "\nBatch: " +
        formData.selectedBatch +
        "\nMobile: " +
        formData.mobile +
        "\n\nThank you, have a nice day!"
    );
    const response = await submitFormToAPI(formData);

    // Handle the API response here and perform further actions based on the response
    if (response.success) {
      // Payment success logic
    } else {
      // Payment failure logic
    }
    e.preventDefault();
  };

  // Mock function to submit form data to the API (replace with actual API call)
  const submitFormToAPI = async (data) => {
    // Implement API call here
    // Return a mocked response for now
    return { success: true };
  };
  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Yoga Classes</h1>
          <img className="logo" src={yinyang} alt="error" />
          <h2>Registration Form</h2>

          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <br />

          <label>Age:</label>
          <input
            placeholder="Select Date of Birth"
            value={formData.age}
            required
            onClick={openModal}
          />

          <br />

          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            placeholder="Enter email"
            required
            name="email"
            onChange={handleInputChange}
          />
          <br />

          <label>Mobile:</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
          <br />

          <label>Batch:</label>
          <select
            name="selectedBatch"
            value={formData.selectedBatch}
            onChange={handleInputChange}
            required
          >
            <option value="" style={{ color: "#555" }}>
              Select Batch
            </option>
            <option value="6-7AM">6 AM - 7 AM</option>
            <option value="7-8AM">7 AM - 8 AM</option>
            <option value="8-9AM">8 AM - 9 AM</option>
            <option value="5-6PM">5 PM - 6 PM</option>
          </select>
          <br />
          <input type="submit" value="Proceed to payment" />
          <br />
        </form>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={"modal-container"}
      >
        <h3>Select Date of Birth</h3>
        <DatePicker
          onChange={setDOB}
          ariaHideApp={false}
          selected={dob}
          maxDate={new Date()}
          scrollableMonthYearDropdown={false}
          showYearDropdown={true}
          placeholderText="MM/DD/YYYY"
          showMonthDropdown={true}
        />
        <button className="close-button" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
}

export default App;
