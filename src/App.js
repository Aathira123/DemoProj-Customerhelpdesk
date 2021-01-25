import React from "react";
import { BrowserRouter as Router, Route,Switch,withRouter } from "react-router-dom";
import {TransitionGroup,CSSTransition} from 'react-transition-group'
import {AuthProvider} from './components/AuthProvider'
import Home from "./pages/HomePage/Home";
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ViewTicket from './pages/Tickets/ViewTicket/ViewTicket'
import Faq from './pages/FAQ/Faq'
import './App.css';
import PrivateRoute from './privateRoute';

import Header from './pages/Header/Header'
 function App({location}) {


  return (
   
      <AuthProvider>
      
        <TransitionGroup>
      <CSSTransition classNames='page' timeout={300} key={location.key}>
     
        <div className="App">
         <Header/>
        
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home/FAQ" component={Faq} />
        <Route path="/home/viewticket" component={ViewTicket}/>
          <Route path="/home" component={Home} />
          </Switch>
         
        </div>
      
      </CSSTransition>
          </TransitionGroup>
     
      </AuthProvider>
   
  );
}

export default withRouter(App);