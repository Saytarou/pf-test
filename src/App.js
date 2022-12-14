import React from 'react';
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addUser' element={<AddUser/>}/>
          <Route path='/editUser/:id' element={<EditUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

