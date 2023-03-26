import React from "react";
import plant from "../assets/plant.png";
function Navbar() {
  return (
    <div>
      <nav class="overflow-hidden flex items-center justify-between flex-wrap bg-teal-700 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-bold text-2xl flex flex-row items-center">
            <img className="h-10 w-10 mx-2" src={plant} />
            Gardener
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
