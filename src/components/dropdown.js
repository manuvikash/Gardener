import React from "react";
import plant from "../assets/plant.png";
function Dropdown() {
    const dropdown = document.createElement("select");

    const option1 = document.createElement("option");
    option1.text = "Option 1";
    dropdown.add(option1);

    const option2 = document.createElement("option");
    option2.text = "Option 2";
    dropdown.add(option2);

    const option3 = document.createElement("option");
    option3.text = "Option 3";
    dropdown.add(option3);

    dropdown.style.position = "absolute";
    dropdown.style.left = "50%";
    dropdown.style.top = "50%";
    dropdown.style.transform = "translate(-50%, -50%)";

}


export default Dropdown;