import { useState } from "react";
import { Search } from "lucide-react";

export const Appbar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="shadow h-14 flex justify-between items-center px-4 bg-white">
      
      {/* Left Logo */}
      <div className="text-lg font-semibold">
        Payment App
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

      {/* Avatar */}
      <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-lg font-medium">
        U
      </div>

    </div>
  );
};
