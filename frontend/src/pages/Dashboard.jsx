import React, { useState } from "react";
import Header from "../components/Header";
import ViewProducts from "../components/ViewProducts";
import '../css/dasboard.css';

function Dashboard() {
  const [searchResults, setSearchResults] = useState(null);
  
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="home-bg min-vh-100">
      <Header onSearchResults={handleSearchResults} />
      <ViewProducts searchResults={searchResults} />
    </div>
  );
}

export default Dashboard;