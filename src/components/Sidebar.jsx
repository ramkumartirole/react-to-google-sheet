import React from 'react';
import UserPreferenceForm from './UserPreferenceForm';

const Sidebar = ({ activeModel, setActiveModel }) => {
  return (
    <div
      className="col-md-4 sidebar p-0"
      style={{
        backgroundColor: '#fff',
        height: '100vh',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Scrollable Content Area */}
      <div
        style={{
          padding: '1.5rem',
          overflowY: 'auto',
          flex: 1,
        }}
      >
        {/* Model A Card */}
        <div
          className={`card mb-3 ${activeModel === 'Model A' ? 'active border-primary bg-light' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveModel('Model A')}
        >
          <div className="card-body">
            <h5 className="card-title">Model A</h5>
            <p className="card-text">Carrier with Bike — displays a mounted bike rack system.</p>
          </div>
        </div>

        {/* Model B Card */}
        <div
          className={`card mb-3 ${activeModel === 'Model B' ? 'active border-primary bg-light' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveModel('Model B')}
        >
          <div className="card-body">
            <h5 className="card-title">Model B</h5>
            <p className="card-text">Rear Storage Box — displays an enclosed rear cargo box.</p>
          </div>
        </div>

        {/* User Preference Form */}
        <hr />
        <UserPreferenceForm />
      </div>
    </div>
  );
};

export default Sidebar;
