import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">Task Manager</div>
        <div className="flex space-x-4">
          <NavItem icon={<DoneIcon />} label="Completed Task" />
          <NavItem icon={<PendingIcon />} label="Pending Task for Today" />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label }) => {
  return (
    <div className="flex items-center space-x-1 text-white cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Navbar;
