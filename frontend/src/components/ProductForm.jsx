import React from "react";

function ProductForm({onClose}) {
  return (
    <div>
      <form>
        <div className="form-group">
          <label className="ms-1">Name</label>
          <input
            type="text"
            className="form-control mt-2 mb-3"
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label className="ms-1">Category</label>
          <select className="form-select mt-2 mb-3">
            <option selected>Select category</option>
            <option>Laptop</option>
            <option>Mobile Phone</option>
            <option>Tablet</option>
          </select>
        </div>

        <div className="form-group">
          <label className="ms-1">Quantity</label>

          <div className="d-flex align-items-center mt-2 mb-4">
            <button className="btn btn-info text-white">+</button>
            <span className="mx-2">0</span>
            <button className="btn btn-warning text-white ">-</button>
          </div>
        </div>

        <div className="d-flex d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <button type="submit" className="btn btn-danger" onClick={onClose}>
            Cancle
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
