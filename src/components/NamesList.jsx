import React from "react";
import deleteSign from "../assets/delete.png"

export default function NamesList({ names, winner, isLoading, removeName }) {
  return (
    <div className="space-y-2 h-[57vh] overflow-y-auto custom-scrollbar">
      {names.map((name, index) => (
        <div
          key={index} className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
            winner === name && !isLoading
              ? "bg-[#850000] border-2 border-yellow-400/50"
              : "bg-white/10 hover:bg-white/25"
          }`}
        >
          <span className="text-white text-[1rem]"> {name} </span>
          <button onClick={() => removeName(name)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all">
            <img src={deleteSign} alt="❌" className="w-[20px]" />
          </button>
        </div>
      ))}

    </div>
    
  );
}