import React, { useContext} from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../Context";

function Header() {
const { authUser } = useContext(Context)

return (
  <header>
    <div className="wrap header--flex">
      <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
      {/* <span className="icn-logo"><i className="material-icons">code</i></span> */}

      <nav>
        <ul className="header--signedout">
      
        {authUser ? (
              <React.Fragment>
                <span> Welcome, {authUser.firstName}!</span>
                <li>
                  <NavLink to={'/signout'}>Sign Out</NavLink>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                {/* <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/teachers">Teachers</NavLink></li> */}
                {/* <li><NavLink to="/courses">Courses</NavLink></li> */}
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
                <li className="header--signedin">
                  <NavLink to="/signin">Sign In</NavLink>
                </li>
                <li className="header--signedout">
                  <NavLink to="/signout">Sign Out</NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
 };


export default Header;