import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';


function ViewContact() {
    const {id} = useParams();
    const [state,setState] = useState([]);
    useEffect(() => {
        const getId = axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => {
            setState({...resp.data[0]}) 
        });
    },[id]);
  return (
    <div style={{ marginTop: "3em"}} >
      <h3>Details of the contact </h3>
        <table className="styled-table" >
            <tbody style={{textAlign:"left"}}>
                <tr>
                    <td>ID: </td>
                    <td>{state.id}</td>
                </tr>
                <tr>
                    <td>NAME: </td>
                    <td>{state.name}</td>
                </tr>
                <tr>
                    <td>EMAIL: </td>
                    <td>{state.email}</td>
                </tr>
                <tr>
                    <td>CONTACT : </td>
                    <td>{state.contact}</td>
                </tr>
                {/* <tr>
                    <td aria-colspan={2}>
                    <Link to="/">
                        <input style={{width:"100%"}} type="button" value="Go Back"/>
                    </Link>
                    </td>
                </tr> */}
            </tbody>
        </table>
    </div>
  );
}

export default ViewContact