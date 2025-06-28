import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ModelViewer from './ModelViewer';

const MainLayout = () => {
  const [activeModel, setActiveModel] = useState('Model A');

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 p-0" style={{ height: '100vh' }}>
        
          <ModelViewer activeModel={activeModel} />
        </div>

      
        <Sidebar activeModel={activeModel} setActiveModel={setActiveModel} />
      </div>
    </div>
  );
};

export default MainLayout;
