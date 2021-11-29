import React from "react";
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginScreen/>}/>
          <Route  path="/home/:id" element={<HomeScreen/>}/>
          <Route  path="/signup" element={<SignupScreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
