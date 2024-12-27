import React, { useState } from "react";
import "../css/dasboard.css";
import ProductForm from "./ProductForm";
import logoImage from "../assets/images/logo.png";
import axios from "axios";

function Header({ onSearchResults }) {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (!searchQuery.trim()) {
        const response = await axios.get("http://localhost:5001/api/product/");
        onSearchResults(response.data);
      } else {
        const response = await axios.get(`http://localhost:5001/api/product/search?query=${searchQuery}`);
        onSearchResults(response.data);
      }
    } catch (error) {
      console.log({ msg: error.message });
      onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex  flex-wrap justify-content-between align-items-center header">

     <div className="search d-flex align-items-center">
        <div className="position-relative w-100">
          <img src={logoImage} alt="Logo" className="logo" height="50px"/>
        </div>
        
      </div>

      <div className="search d-flex align-items-center ms-5">
        <div className="position-relative w-100">
          <input 
            className="form-control" 
            placeholder="Search products by name..." 
            name="search" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "250px" }}
          />
        </div>
        <button 
          className="ms-2 btn btn-primary" 
          onClick={handleSearch}
          disabled={loading}
        >
         Search
        </button>
      </div>


      <div className="add-btn mt-3 mt-md-0 me-4">
        <button className="btn btn-success" onClick={handleShow}>
          Add Products
        </button>
      </div>

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Products</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ProductForm onClose={handleClose} />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop fade show" onClick={handleClose}></div>
      )}
    </div>
  );
}

export default Header;