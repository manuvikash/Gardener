import React from "react";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <div
      className="h-screen w-screen -z-20"
      style={{ backgroundImage: "url(/img/bg.jpg)" }}
    >
      <Navbar />
      <div classname="flex text-white text-3xl items-center text-center">
        <p className=" text-white text-3xl items-center text-center">Hello</p>
      </div>
    </div>
  );
}

export default App;
