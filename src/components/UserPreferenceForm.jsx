import React, { useState } from 'react';
import axios from 'axios';

const UserPreferenceForm = () => {
  const [favModel, setFavModel] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!favModel || !name || !email) {
      setStatus('❗ Please fill all the fields.');
      return;
    }

    try {
      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbySs8OQR9-62P5eGkz-vH6p2quW3-NzOX7OdHQD_AeT8iylVlgaMP4OydLZgDZPl-Lx/exec',
        new URLSearchParams({
          model: favModel,
          name,
          email
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.status === 200) {
        setStatus('✅ Preference submitted and email sent!');
        setFavModel('');
        setName('');
        setEmail('');
      } else {
        setStatus('⚠️ Submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('🚫 Error connecting to the server.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-3">Choose Your Favorite Model</h5>
      <select
        className="form-select mb-3"
        value={favModel}
        onChange={(e) => setFavModel(e.target.value)}
        required
      >
        <option value="">Select a model</option>
        <option value="Model A">Model A</option>
        <option value="Model B">Model B</option>
      </select>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button className="btn btn-primary w-100">Submit</button>

      {status && <p className="mt-3 text-info">{status}</p>}
    </form>
  );
};

export default UserPreferenceForm;
