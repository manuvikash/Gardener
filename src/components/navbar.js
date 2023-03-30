import React from "react";
import plant from "../assets/plant.png";
function Navbar() {
  return (
    <div>
      <nav className="overflow-hidden flex items-center justify-between flex-wrap bg-teal-700 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-bold text-2xl flex flex-row items-center">
            <img className="h-10 w-10 mx-2" src={plant} />
            Gardener
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
