import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./Home.css"
import { toast } from 'react-toastify';



function Home() {
  const [data,setNewData] = useState([]);

  const loadData = async () => {
    const response =  await axios.get("http://localhost:5000/api/get");
    setNewData(response.data);
  } 

  useEffect (() => {
    loadData();
    console.log("data read")
  },[]);

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete the contact")) {
      axios.delete(`http://localhost:5000/api/delete/${id}`);
      toast.success("Contact deleted successfully!");
      setTimeout(() => {
        loadData();
      }, 700);
    };
  }

  return (
    <div style={{ marginTop: "2em" }}>
      <Link to="/addContact">
        <button className="btn btn-addcontact">Add contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>E-mail</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/editContact/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => {handleDelete(item.id)}}>Delete</button>
                  <Link to={`/viewContact/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home