import React from "react";
import "../css/dasboard.css";
import phoneImg from '../assets/images/phone.png'

function ViewProducts() {
  
  return (
    <div className="mt-5 row ">
      <div className="d-flex justify-content-center">
        <div className="card product-card shadow">
             <img src={phoneImg} height="250px" width="300px"/>

             <h3 className="text-center mb-3">Iphone</h3>
             
             <div className="d-flex justify-content-between mb-1">
             <h5 className="text-start ms-3">category</h5>
             <h5 className="text-start me-3">phone</h5>
             </div>

             <div className="d-flex justify-content-between mb-1">
             <h5 className="text-start ms-3">quantity</h5>
             <h5 className="text-start me-3">2</h5>
             </div>

             <div className="d-flex justify-content-between mb-1 p-3">
              <button className="btn btn-info text-white">Update</button>
              <button className="btn btn-danger">Delete</button>
             </div>
             

        </div>

        <div className="card product-card "></div>

        <div className="card product-card"></div>

        <div className="card product-card"></div>
        
      </div>

    </div>
  );
}

export default ViewProducts;
