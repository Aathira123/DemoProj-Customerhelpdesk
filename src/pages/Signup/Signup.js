import React,{useState} from "react";

import classes from './Signup.module.css'
import {firestore,auth} from '../../firebase'
import { Link } from "react-router-dom";
import {Card,Form,Button,Col,Alert} from 'react-bootstrap'
import {useAuth} from '../../components/AuthProvider'

function Login(props) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const[username,setUserName]=useState('')
const [error,setError]=useState('')

   const {signup}=useAuth()

async function handleSubmit(e){
    e.preventDefault()
    try{
        setError('')
       await signup(email,password)
       
       
       .then(function() {
        firestore.collection('users').doc(email).set({
          email:email,
          password:password,
          ticket:[]
        })
        var user=auth.currentUser;
user.updateProfile({
  displayName: username,
 
}).then(function() {
  

}).catch(function(error) {
  setError(error.message)
});
        props.history.push('/login')
    })
    .catch(function(error) {
      
        setError(error.message)
     
       setTimeout(()=>{
         setError('')
       },2000)
    });
       
    }
    catch{
setError('Failed to create account')
    }
   
}

    
  return (
    <div className={classes.top}>
    <Card className={classes.Card}>
          {error?<Alert variant="danger">{error}</Alert>:null}
     <Col md={12} sm={12} lg={12}>
      <Form onSubmit={(event)=>handleSubmit(event)}>
          <h2 className={classes.h2}>SIGNUP</h2>
          <Form.Group >
         
    <Form.Label>Username</Form.Label>
    
    <Form.Control type="test" placeholder="Username.." value={username} onChange={(e)=>setUserName(e.target.value)} />
   
  </Form.Group>
         
          <Form.Group >
         
    <Form.Label>Email address</Form.Label>
    
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
   
  </Form.Group>

  <Form.Group >
 
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    
  </Form.Group>

 

<Link to="/login">Already have an account ? Click here</Link>
  <Button variant="info" type="submit" >
   Sign Up Now
  </Button>
      </Form>
      </Col>
    </Card>
    </div>
  );
}

export default Login;