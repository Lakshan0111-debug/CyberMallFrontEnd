import React from "react";
import "./AddNewSupplier.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import ProfileImg from "../../assets/DefaultProfile.jpg"

const AddNewSupplier = () => {

  return (
    <div className='addNewSupplier'>
      <AdminSidebar/>
      <div className='addNewSupplierContainer'>
        <AdminNavbar/>
        <div className='top'>
            <h1>ADD NEW SUPPLIER</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img src={ProfileImg} alt="" className='image'/>
          </div>
          <div className='right'>
            <form>
              <div className='formInput'>
                <label>Supplier ID</label>
                <input type='int' id='SUPPLIER_ID' name='supplierId' placeholder='Enter Supplier ID'/>
              </div>
              <div className='formInput'>
                <label>Supplier Name</label>
                <input type='String' id='SUPPLIER_NAME' name='supplierName' placeholder="Enter Supplier's Name"/>
              </div>
              <div className='formInput'>
                <label>Address</label>
                <input type='String' id='SUPPLIER_ADDRESS' name='supplierAddress' placeholder="Enter Supplier's Address"/>
              </div>
              <div className='formInput'>
                <label>E-Mail</label>
                <input type='string' id='SUPPLIER_EMAIL' name='supplierEmail' placeholder="Enter Supplier's E-Mail"/>
              </div>
              <div className='formInput'>
                <label>Phone</label>
                <input type='string' id='SUPPLIER_PHONE' name='supplierPhone' placeholder="Enter Supplier's Phone No"/>
              </div>
              <button type='submit'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewSupplier;