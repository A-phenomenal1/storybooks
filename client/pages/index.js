import React from "react";

import Landing from "../components/Landing";

function Dashboard({ currentUser }) {
  return (
    <div className="main-container">
      <Landing currentUser={currentUser} />
    </div>
  );
}

export default Dashboard;
