// src/components/MainLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [activeModel, setActiveModel] = useState('Model A');

  return (
    <div className="container-fluid">
      <div className="row">
        {/* 3D Viewer Placeholder */}
        <div className="col-md-8 scene-area d-flex align-items-center justify-content-center">
          <div style={{ width: '80%', height: '600px', background: '#c0b6b6' }}>
            <h3 className="text-center text-muted" style={{ fontSize: '100px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {activeModel}
            </h3>
          </div>
        </div>
        {/* Sidebar with Form */}
        <Sidebar activeModel={activeModel} setActiveModel={setActiveModel} />
      </div>
    </div>
  );
};

export default MainLayout;
