/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { useState, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Preload models
useGLTF.preload("/3dmodels/carrier_with_bike.glb");
useGLTF.preload("/3dmodels/roof_rack.glb");

// Model A
function ModelA() {
  const { scene } = useGLTF("/3dmodels/carrier_with_bike.glb");
  return (
    <group key="model-a">
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

// Model B
function ModelB() {
  const { scene } = useGLTF("/3dmodels/roof_rack.glb");
  return (
    <group key="model-b">
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

// Camera Reset on model switch
function ResettableCamera({ activeModel }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);
  }, [activeModel, camera]);
  return null;
}
ResettableCamera.propTypes = {
  activeModel: PropTypes.string.isRequired,
};

// MAIN COMPONENT
export default function ModelViewerPage() {
  const [activeModel, setActiveModel] = useState("A");
  const [favModel, setFavModel] = useState("Model A");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("entry.1295136813", favModel); // Favorite Model
    formData.append("entry.1868727375", name); // Name
    formData.append("entry.1275233110", email); // Email

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
      alert("Submission failed");
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* LEFT: 3D VIEWER */}
        <div
          className="col-md-8 d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div style={{ width: "80%", height: "600px", pointerEvents: "auto" }}>
            <Canvas shadows>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <OrbitControls />
              <ResettableCamera activeModel={activeModel} />
              <Suspense fallback={null}>
                {activeModel === "A" ? <ModelA /> : <ModelB />}
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* RIGHT: SIDEBAR + FORM */}
        <div
          className="col-md-4 p-4"
          style={{
            background: "#fff",
            minHeight: "100vh",
            pointerEvents: "auto",
          }}
        >
          {/* Cards */}
          <div
            className={`card mb-3 ${activeModel === "A" ? "active" : ""}`}
            style={{
              cursor: "pointer",
              border:
                activeModel === "A" ? "2px solid #0d6efd" : "1px solid #ccc",
              background: activeModel === "A" ? "#d6e0ff" : "#fff",
              boxShadow:
                activeModel === "A" ? "0 0 10px rgba(13,110,253,0.4)" : "none",
            }}
            onClick={() => {
              setActiveModel("A");
              setFavModel("Model A");
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Model A</h5>
              <p className="card-text">Carrier with Bike</p>
            </div>
          </div>

          <div
            className={`card mb-3 ${activeModel === "B" ? "active" : ""}`}
            style={{
              cursor: "pointer",
              border:
                activeModel === "B" ? "2px solid #0d6efd" : "1px solid #ccc",
              background: activeModel === "B" ? "#d6e0ff" : "#fff",
              boxShadow:
                activeModel === "B" ? "0 0 10px rgba(13,110,253,0.4)" : "none",
            }}
            onClick={() => {
              setActiveModel("B");
              setFavModel("Model B");
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Model B</h5>
              <p className="card-text">Roof Rack</p>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="alert alert-success mt-4" role="alert">
              Thank you! Your preference has been recorded.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4">
              <h6>Tell us which model you prefer!</h6>
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
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit Preference
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
