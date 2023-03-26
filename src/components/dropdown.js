import React from "react";

function Dropdown() {
      return (
        <div className="overflow-hidden flex justify-center items-center h-screen">
          <select className="block w-64 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option>Plant 1</option>
            <option>Plant 2</option>
            <option>Plant 3</option>
          </select>
        </div>
      );
}


export default Dropdown;