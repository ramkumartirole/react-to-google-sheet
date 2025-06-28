import { useState } from "react";

export default function UserFormPage() {
  const [favModel, setFavModel] = useState("Model A");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("entry.1295136813", favModel); // Favorite Model
    formData.append("entry.1868727375", name); // Your Name
    formData.append("entry.1275233110", email); // Email Address

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdclerGQzY0VyCgfE3RK1fqxccjD2T2zHi1zxAoRuAPCPai8g/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );
      setSubmitted(true);
    } catch (err) {
      alert("Submission failed.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Submit Your Preference</h2>

      {submitted ? (
        <div className="alert alert-success">
          Thank you! Your preference has been recorded.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Favorite Model</label>
            <select
              className="form-select"
              value={favModel}
              onChange={(e) => setFavModel(e.target.value)}
              required
            >
              <option value="Model A">Model A</option>
              <option value="Model B">Model B</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
