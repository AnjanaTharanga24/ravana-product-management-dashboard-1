import React, { useState } from "react";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ViewProducts from "../components/ViewProducts";

function Dashboard() {

  
  return (
   <div>
       <Header/>
       
       <ViewProducts/>
   </div>
  );
}

export default Dashboard;
