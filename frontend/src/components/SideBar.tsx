import React from 'react';

interface SidebarProps {
  usersName: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ usersName }) => {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <div >
        <h2 className="text-xl font-bold mb-4 m">Users Joined</h2>
      </div>
        {usersName.map((name, index) => (
          <li key={index} className="mb-2">
            {name}
          </li>
        ))}
    </div>
  );
};

export default Sidebar;
