import React from "react";

export default function Spinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div>
       <p className="text-white text-[1.3rem] italic">Casting the spell...</p>
      </div>
    </div>
  );
}