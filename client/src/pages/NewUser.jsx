import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import logo from "../images/logo.png";
import anon from "../images/anon.png";
import reload from "../images/reload.png";
import Avatar from "../components/Avatar";
import "../App.css";

const NewUser = () => {
  // Random color generator
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Assign colors
  const [color1, setColor1] = useState(getRandomColor());
  const [color2, setColor2] = useState(getRandomColor());
  const [color3, setColor3] = useState(getRandomColor());

  // Reshuffle colors
  const reshuffleColors = () => {
    setColor1(getRandomColor());
    setColor2(getRandomColor());
    setColor3(getRandomColor());
  };

  // Create a new user with the colors
  const createUser = () => {
    localStorage.setItem("userId", uuidv4());
    localStorage.setItem("color1", color1);
    localStorage.setItem("color2", color2);
    localStorage.setItem("color3", color3);
  };

  return (
    <div className="center">
      <img
        src={logo}
        alt=""
        style={{ maxHeight: "60px", marginBottom: "20px" }}
      />

      <div className="login-container">
        <div className="flex" style={{ marginBottom: "20px" }}>
          <img
            src={anon}
            style={{ height: "16px", marginRight: "5px" }}
            alt=""
          />
          <p>Your anonymous avatar:</p>
        </div>
        <div
          style={{
            height: "200px",
            width: "200px",
            borderRadius: "99px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "40px",
            position: "relative",
          }}
        >
          <Avatar
            size="200px"
            color1={color1}
            color2={color2}
            color3={color3}
          />
          <button onClick={reshuffleColors} className="round-button">
            <img style={{ height: "12px" }} src={reload} alt="" />
          </button>
        </div>

        <a href="/">
          <button className="primary-button" onClick={createUser}>
            Join or start a new discussion
          </button>
        </a>
        <p className="microcopy" style={{ textAlign: "left" }}>
          Please make sure to read our <a href="">community guidelines</a>{" "}
          before entering a discussion
        </p>
      </div>
    </div>
  );
};

export default NewUser;
