import React, { useEffect, useState } from "react";
import "../css/dasboard.css";
import phoneImg from '../assets/images/phone.png'
import laptopImg from '../assets/images/laptop.png'
import tabletImg from '../assets/images/tablet.png'
import axios from "axios";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/product/");
      setProducts(response.data);
    } catch (error) {
      console.log({ msg: error.message });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/product/${id}`);
      getProducts();
    } catch (error) {
      console.log({ msg: error.message });
    }
  };

  const getImage = (category) =>{
     if(category === "Mobile Phone"){
       return phoneImg
     }else if(category === "Laptop"){
       return laptopImg
     }else if(category === "Tablet"){
       return tabletImg
     }
  }

  return (
    <div className="container py-4 mt-5">
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
                    <button className="btn btn-info text-white flex-grow-1">
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
    </div>
  );
}

export default ViewProducts;