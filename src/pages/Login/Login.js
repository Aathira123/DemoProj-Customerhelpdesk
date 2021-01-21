import React,{useState} from "react";
import {useAuth} from '../../components/AuthProvider'
import classes from './Login.module.css'
import {  Link } from "react-router-dom";
import {Card,Form,Button,Col,Alert} from 'react-bootstrap'
import {auth} from '../../firebase'
import {CircularProgress} from '@material-ui/core'

function Login(props) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [load,setLoad]=useState(false);
  
  const [error,setError]=useState('')

    const {login}=useAuth()
    var loading=<CircularProgress color="primary" size='12rem' style={{position:'absolute',top:'40%',left:'40%'}}/>
if(load===false){
    loading=null;
    
}


 async function loginFunc(e){
   

     e.preventDefault()
     
     try{
         setError('')
  
         setLoad(true);
        await login(email,password)
        
        .then((user)=>{
          
          setLoad(false)
          
         
            localStorage.setItem("currentuser",JSON.stringify(auth.currentUser))
         
          props.history.push('/home')
         
          
        })
        .catch(function(error) {
      
          setError(error.message)
       
         
      });
        
        
     }
     catch{
 setError('Failed to  login')
     }
    
 }

  return (
 <div className={classes.top}>
    <Card className={classes.Card}>
      {error?<Alert variant="danger">{error}</Alert>:null}
     <Col md={12} sm={12} lg={12}>
      <Form onSubmit={(event)=>loginFunc(event)}>
        {!error && loading}
          <h2 className={classes.h2}>Login</h2> 
       
          <Form.Group >
         
    <Form.Label>Email address</Form.Label>
    
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
   
  </Form.Group>

  <Form.Group >
 
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    
  </Form.Group>

  
 

<Link to="/">Create an Account</Link>
  <Button variant="info" type="submit" >
    Log In
  </Button>
      </Form>
      </Col>
    </Card>
    </div>
  );
}

export default Login;