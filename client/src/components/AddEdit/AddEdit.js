import React, {useState,useEffect} from 'react';
import './AddEdit.css';
import {toast} from 'react-toastify'
import {useNavigate,Link,Params, useParams} from 'react-router-dom';
import axios from 'axios';


const initialState = {
    name: "",
    email: "",
    contact: ""
}

function AddEdit() {
    const [state,setState] = useState(initialState);
    const {name,email,contact} = state;
    const history = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => {
            setState({...resp.data[0]})
        });
    },[id]);
    // const [name,setName] = useState("");
    // const [email,setEmail] = useState("");
    // const [contact,setContact] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!name || !email || !contact) {
            toast.error("Please provide value into each input field!!");
        }
        else {
            if (!id) {
                axios.post("http://localhost:5000/api/post", {
                  name,
                  email,
                  contact,
                })
                .then(() => {
                  setState({ name: "", email: "", contact: "" });
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Your data successfully added!!");
            } else {
                axios.put(`http://localhost:5000/api/put/${id}`, {
                  name,
                  email,
                  contact,
                })
                .then(() => {
                  setState({ name: "", email: "", contact: "" });
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Your data successfully updated!!");
            }
            
            setTimeout(() => history("/") , 700);
            
        }
    }

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state,[name]:value})
    }
  return (
    
    <div style={{marginTop:"100px"}}>   
        <form action="#" onSubmit={handleSubmit} style={{margin: "auto",maxWidth:"400px",alignContent:"center",padding: "15px"}}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={name || ""} onChange={handleInputChange} placeholder="Your name..."/>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={email || ""} onChange={handleInputChange} placeholder="Your email..."/>
            <label htmlFor="contact">Contact</label>    
            <input type="number" name="contact" id="contact" value={contact || ""} onChange={handleInputChange} placeholder="Contact No..."/>
            <input className="btn btn-contact" value={id? "Update" : "Save"} type="submit" />
            <Link to="/">
                <input type="button" value="Go Back"/>
            </Link>
        </form>
    </div>
  );
}

export default AddEdit