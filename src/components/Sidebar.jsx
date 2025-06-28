// src/components/Sidebar.jsx
import React from 'react';
import UserPreferenceForm from './UserPreferenceForm';

const Sidebar = ({ activeModel, setActiveModel }) => {
  return (
    <div className="col-md-4 sidebar p-4">
      <div
        className={`card mb-3 ${activeModel === 'Model A' ? 'active' : ''}`}
        style={{ cursor: 'pointer' }}
        onClick={() => setActiveModel('Model A')}
      >
        <div className="card-body">
          <h5 className="card-title">Model A</h5>
          <p className="card-text">Basic info about Model A goes here.</p>
        </div>
      </div>
      <div
        className={`card mb-3 ${activeModel === 'Model B' ? 'active' : ''}`}
        style={{ cursor: 'pointer' }}
        onClick={() => setActiveModel('Model B')}
      >
        <div className="card-body">
          <h5 className="card-title">Model B</h5>
          <p className="card-text">Basic info about Model B goes here.</p>
        </div>
      </div>
      <UserPreferenceForm />
    </div>
  );
};

export default Sidebar;
