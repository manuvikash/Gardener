import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Dropdown from "./components/dropdown";

function App() {
  return (
    <div
      className="h-screen w-screen overflow-hidden"
      style={{ backgroundImage: "url(/img/bg.jpg)" }}
    >
      <Navbar />

      <div className="h-screen w-screen flex flex-col  text-3xl items-center text-center justify-center">
        <Dropdown />
      </div>

    </div>
  );
}

export default App;
