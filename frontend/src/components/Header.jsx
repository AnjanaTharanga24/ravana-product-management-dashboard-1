import React, { useState } from "react";
import "../css/dasboard.css";
import ProductForm from "./ProductForm";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
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
