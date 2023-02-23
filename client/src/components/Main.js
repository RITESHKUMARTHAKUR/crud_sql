import React from 'react';
import {Routes, Route,Link} from 'react-router-dom';
import Home from './HomeComponent/Home';
import AddContact from './AddEdit/AddEdit';
import ViewContact from './ViewComponent/ViewContact';


function mainComponent() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/addContact' element={<AddContact/>} />
        <Route path='/editContact/:id' element={<AddContact/>} />
        <Route path='/viewContact/:id' element={<ViewContact/>} />
        
        <Route path='*' element={goBack()} />
        {/* <Route path='*' element={<center>Go Back</center>} /> */}
    </Routes>
  )
}

function goBack () {
  return (
    <div>
    <center>
      <h1>Sorry, this page doesn't exist!!</h1>
      <Link to={"/"} >
        <button className='btn btn-homePage'>Home Page</button>
      </Link>
    </center>
    </div>
    
  )
}

export default mainComponent;