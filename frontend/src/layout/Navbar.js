import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">Architect Management System</div>
          {/* Add any additional items you want in your navbar */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
