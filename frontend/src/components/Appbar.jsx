import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Appbar = ({user}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  //get firstname letter from name and email
  const firstLetter = user?.firstname
  ?user.firstname.charAt(0).toUpperCase()
  :user?.email.charAt(0).toUpperCase();

 const handleLogout = () => {
  localStorage.removeItem("token")
  navigate("/signup")
 }


  return (
    <div className="shadow h-14 flex justify-between items-center px-4 bg-white">
      
      {/* Left Logo - Dynamic with user name */}
      <div className="text-lg font-semibold">
        {user?.firstname ? `${user.firstname}'s Pay` : "Payment App"}
      </div>

      {/* 🔍 Search Bar */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Avatar + Logout */}
      <div className="flex items-center gap-3">

        <div className="rounded-full h-10 w-10 bg-indigo-500 text-white flex justify-center items-center font-semibold">
          {firstLetter}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
        >
          Logout
        </button>

      </div>
    </div>
  );
};
