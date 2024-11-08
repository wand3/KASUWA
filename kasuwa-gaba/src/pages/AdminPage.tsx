import Jiki from "../components/Jiki";
import React from "react";
import AddProduct from "../components/Admin/AddProduct";


export const AdminPage = () => {

  return (
    <>
      <Jiki nav>
        <AddProduct />
        <h3>AdminPage page</h3>
      </Jiki>
      
    </>
  )
}

export default AdminPage;