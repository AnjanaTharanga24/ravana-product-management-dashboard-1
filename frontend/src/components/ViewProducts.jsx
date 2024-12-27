import React, { useEffect, useState } from "react";
import "../css/dasboard.css";
import phoneImg from '../assets/images/phone.png'
import laptopImg from '../assets/images/laptop.png'
import tabletImg from '../assets/images/tablet.png'
import axios from "axios";
import UpdateProducts from "./UpdateProducts";

function ViewProducts({ searchResults }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
    
  const handleClose = () => setShowModal(false);
  const handleShow = (product) => {
    setSelectedProduct(product)
    setShowModal(true);
  }
        
  useEffect(() => {
    if (searchResults === null) {
      getProducts();
    } else {
      setProducts(searchResults);
      setLoading(false);
    }
  }, [searchResults]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/product/");
      setProducts(response.data);
    } catch (error) {
      console.log({ msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/product/${id}`);
      getProducts();
    } catch (error) {
      console.log({ msg: error.message });
    }
  };

  const getImage = (category) => {
    if (category === "Mobile Phone") {
      return phoneImg;
    } else if (category === "Laptop") {
      return laptopImg;
    } else if (category === "Tablet") {
      return tabletImg;
    }
  };

  if (loading) {
    return (
      <div className="container py-4 mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 mt-5">
      {products.length === 0 ? (
        <div className="text-center">
          <h3 className="text-muted">No products found</h3>
          <button className="btn btn-primary" onClick={getProducts}>View All</button>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((product, index) => (
            <div key={index} className="col">
              <div className="card h-100 product-card shadow hover-effect">
                <div className="img-container p-3 text-center">
                  <img 
                    src={getImage(product.category)} 
                    className="img-fluid product-img"
                    alt={product.name}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <h4 className="card-title text-center mb-3">{product.name}</h4>

                  <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold">Category:</span>
                      <span>{product.category}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Quantity:</span>
                      <span>{product.quantity}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-3">
                    <div className="d-flex gap-2 justify-content-between">
                      <button 
                        className="btn btn-info text-white flex-grow-1" 
                        onClick={() => handleShow(product)}
                      >
                        Update
                      </button>
                      <button 
                        className="btn btn-danger flex-grow-1"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Product</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <UpdateProducts 
                product={selectedProduct} 
                onClose={handleClose} 
                onUpdate={getProducts} 
              />
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

export default ViewProducts;