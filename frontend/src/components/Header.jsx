import React from 'react';
import "../css/dasboard.css";

function Header() {
  return (
    <div className="d-flex mt-4 flex-wrap justify-content-between align-items-center">
      <div className="search d-flex align-items-center">
        <input className="form-control" placeholder="Search..." />
        <button className="ms-2 btn btn-primary">Search</button>
      </div>

      <div className="category-select mt-3 mt-md-0">
        <select className="form-select ms-md-5">
          <option selected>Search by category</option>
          <option>One</option>
          <option>Two</option>
          <option>Three</option>
        </select>
      </div>

      <div className="add-btn mt-3 mt-md-0 me-4">
        <button className="btn btn-success">Add Products</button>
      </div>
    </div>
  );
}

export default Header;
