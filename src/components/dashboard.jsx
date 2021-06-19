import React from "react";
import Header from "./header";
import Requests from "./requests";
import Footer from "./footer";

const Dashboard = () => {
  return (
    <div className="mainContainer">
      <Header />
      <Requests />
      <Footer />
    </div>
  );
};

export default Dashboard;
