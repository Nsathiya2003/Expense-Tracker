import { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarItems } from "../data/sidebarItems";
import { ChevronDown, ChevronRight } from "lucide-react";
import  profile from '../assets/expense1.jpg';
import { useCustomQuery } from "../api/apiServices/customFunction";

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});

  const toggleDropdown = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const user_id = localStorage.getItem('user_id');
   const { data } = useCustomQuery({
      key: ["user", user_id],
      fetchfn: () => getUserById(user_id),
      enabled: !!user_id,
  });

  return (
    <>
    <div>
      <img 
      src={profile}
      //  src={`http://localhost:5000/uploads/users/${data.data?.user_profile}`}

      alt="" 
      className="w-40 h-40 rounded-full m-14 "
      />
    </div>
       <div className="w-70 text-white shadow-md mt-10 ">
      <div className="space-y-2 pt-10 px-2">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            {/* Menu Item with Children */}
            {item.children ? (
              <>
                <div
                  onClick={() => toggleDropdown(item.title)}
                  className="cursor-pointer flex justify-between items-center bg-zinc-900 p-3 m-2 rounded-lg hover:bg-zinc-700 transition duration-300 group"
                >
                  <div className="flex items-center space-x-2">
                    <span className="group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="transition-transform">
                    {openMenus[item.title] ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </span>
                </div>

                <div
                  className={`ml-6 overflow-hidden transition-all duration-300 ${
                    openMenus[item.title] ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  {item.children.map((child, childIdx) => (
                    <NavLink
                      key={childIdx}
                      to={child.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-sm rounded-md mt-1 hover:bg-zinc-700 transition-colors ${
                          isActive ? "bg-zinc-700 text-green-400" : "text-gray-300"
                        }`
                      }
                    >
                      <div className="flex items-center space-x-2">
                        {child.icon && (
                          <span className="text-gray-400">{child.icon}</span>
                        )}
                        <span>{child.title}</span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </>
            ) : (
              // Menu Item without Children
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block bg-zinc-900 m-2 p-3 rounded-lg hover:bg-zinc-700 transition duration-300 group ${
                    isActive ? "text-green-400" : "text-white"
                  }`
                }
              >
                <div className="flex items-center space-x-2">
                  <span className="group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </div>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
 
  );
}
