// src/components/MainLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ModelViewer from './ModelViewer';

const MainLayout = () => {
  const [activeModel, setActiveModel] = useState('Model A');

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left: 3D Viewer Area */}
        <div className="col-md-8 p-0" style={{ height: '100vh' }}>
          {/* REMOVE the static gray box and H3 placeholder */}
          <ModelViewer activeModel={activeModel} />
        </div>

        {/* Right: Sidebar */}
        <Sidebar activeModel={activeModel} setActiveModel={setActiveModel} />
      </div>
    </div>
  );
};

export default MainLayout;
