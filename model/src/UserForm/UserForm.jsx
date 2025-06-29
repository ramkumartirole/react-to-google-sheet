import React, { useState } from 'react';
import './style.css';


const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', preference: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await fetch(
//         'https://script.google.com/macros/s/AKfycbwkLW7Dce0t8uz1srQFMckUtDOXo7erGgXh2Ptm4VYrFGND_Rgzd6VV9wzWjwIWN1Dw/exec', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       setSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting to Google Sheets:', error);
//     }
//   };

    const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();
  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("preference", formData.preference);

  try {
    await fetch("https://script.google.com/macros/s/AKfycbwkLW7Dce0t8uz1srQFMckUtDOXo7erGgXh2Ptm4VYrFGND_Rgzd6VV9wzWjwIWN1Dw/exec", {
      method: "POST",
      body: form,
      // ❌ Do NOT include 'Content-Type': 'application/json'
    });

    setSubmitted(true);
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
  }
};



  if (submitted) {
    return <h2>✅ Thanks! Your response was recorded.</h2>;
  }

  return (
    <div className="form-container">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Preferred Model</label>
        <select name="preference" value={formData.preference} onChange={handleChange} required>
          <option value="">Choose one...</option>
          <option value="Model A">Model A</option>
          <option value="Model B">Model B</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
