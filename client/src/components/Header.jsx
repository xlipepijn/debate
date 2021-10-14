import React from 'react'
import { Link } from "react-router-dom";
const Header = () => {
    return (
      <div>
        <h2>React Router Tutorial</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
}

export default Header
