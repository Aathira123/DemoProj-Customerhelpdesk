import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {AuthProvider} from './components/AuthProvider'
import Home from "./pages/HomePage/Home";
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ViewTicket, {} from './pages/Tickets/ViewTicket/ViewTicket'
import './App.css';
import PrivateRoute from './privateRoute';
import {CountProvider} from './context/count'
import Header from './pages/Header/Header'
 function App(props) {


  return (
   
      <AuthProvider>
        <CountProvider>
      <Router>
        <div className="App">
         <Header/>
         
        
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/viewticket" component={ViewTicket} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
      </CountProvider>
      </AuthProvider>
   
  );
}

export default App;