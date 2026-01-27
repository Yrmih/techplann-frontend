"use client";

import { useState } from "react";


export const Sidebar = () => {

  const [isCollapsed, setIsCollapsed ] = useState(false);

  const menuItems = [
    {name: "Home", href: "./dashboard"},
    {name: "Cadastros", href: "./dashboard/registrations"},
    {name: "Planejamentos", href: "./dashboard/planning"},
    {name: "SWOT", href: "./dashboard/swot"},
    {name: "Canvas", href: "./dashboard/canvas"},
    {name: "Cultura", href: "./dashboard/culture"},
    {name: "BSC", href: "./dashboard/bsc"},
    {name: "Projetos", href: "./dashboard/projects"},
    {name: "Segurança", href: "./dashboard/security"},
  ]


  return(
    <aside
      style={{width: isCollapsed ? "80px" : "260px"}}
      className="transition-all duration-300"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">Logo</div>
        {isCollapsed && <span className="font-bold">Meu App</span>}
      
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? ">" : "<"}
      </button>
    </div>

    <nav>
      {menuItems.map(item => (
        <a
          key={item.name}
          href={item.href}>
            {!isCollapsed && item.name}
      </a>
      ))}
    </nav>

    <div className="mt-auto p-4 border-t border-gray-700">
      <button className="block w-full p-2 rounded hover:bg-red-700">Sair</button>
    </div>


    </aside>
  );
}