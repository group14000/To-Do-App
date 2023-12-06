"use client";
import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';

const Navbar = ({ onShowCompleted, onShowPending }) => {
  const [showPending, setShowPending] = useState(true);

  const handleShowCompleted = () => {
    setShowPending(false);
    onShowCompleted();
  };

  const handleShowPending = () => {
    setShowPending(true);
    onShowPending();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">Task Manager</div>
        <div className="flex space-x-4">
          <NavItem
            icon={<DoneIcon />}
            label="Completed Task"
            onClick={handleShowCompleted}
          />
          <NavItem
            icon={<PendingIcon />}
            label={showPending ? "Pending Task" : "All Task"}
            onClick={handleShowPending}
          />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label, onClick }) => {
  return (
    <div className="flex items-center space-x-1 text-white cursor-pointer" onClick={onClick}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Navbar;
