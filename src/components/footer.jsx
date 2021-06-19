import React from "react";
import { Link } from "react-router-dom";
import AddCurrency from "./addCurrency";
import GoalsContainer from "./goalsContainer";
const Footer = () => {
  return (
    <div className="footer">
      <GoalsContainer />
      <AddCurrency />
      <div className="footerButtons">
        <Link to="/eventlog" className="button">
          View Log
        </Link>
        <Link className="button" to="/editSettings">
          Settings
        </Link>
        <Link className="button" to="/editGoals">
          Edit Goals
        </Link>
        <Link className="button" to="/editRedemptions">
          Edit Store
        </Link>
      </div>
    </div>
  );
};

export default Footer;
