import React from "react";
import { Link } from "react-router-dom";

function Header(){
  return (
    <header>
      <nav className="menu">
        <ul>
          <li className="menu__item">
            <a>
              <Link to="/notes">Notes</Link>
            </a>  
          </li>
          <li className="menu__item">
            <a>
              <Link to="/tags">Tags</Link>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;