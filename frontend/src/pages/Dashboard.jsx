import React, { useState } from "react";
import Header from "../components/Header";
import ViewProducts from "../components/ViewProducts";

function Dashboard() {
  const [searchResults, setSearchResults] = useState(null);
  
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <Header onSearchResults={handleSearchResults} />
      <ViewProducts searchResults={searchResults} />
    </div>
  );
}

export default Dashboard;