import React, { useState } from 'react';
import SideNav from './SideNav';
import './SideNav.css';

const AppLayout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="main-container">
      <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        className="page-content"
        style={{
          marginLeft: isExpanded ? '220px' : '72px',
          width: isExpanded ? 'calc(100% - 220px)' : 'calc(100% - 72px)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
