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
      console.log(response.data);
    } catch (error) {
      console.log({ msg: error.message });
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
    <div className="mt-5">
      <div className="container">
        <div className="row">
          {products.map((product,index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card product-card shadow">
               
                <img 
                  src={getImage(product.category)} 
                  height="250px" 
                  width="300px"
                />

                <div className="card-body">
                  <h3 className="text-center mb-3">{product.name}</h3>

                  <div className="d-flex justify-content-between mb-1">
                    <h5 className="text-start ms-3">Category</h5>
                    <h5 className="text-start me-3">{product.category}</h5>
                  </div>

                  <div className="d-flex justify-content-between mb-1">
                    <h5 className="text-start ms-3">Quantity</h5>
                    <h5 className="text-start me-3">{product.quantity}</h5>
                  </div>

                  <div className="d-flex justify-content-between mb-1 p-3">
                    <button className="btn btn-info text-white">Update</button>
                    <button 
                      className="btn btn-danger"
                      
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;