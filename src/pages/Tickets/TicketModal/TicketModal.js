import React,{useState,useEffect} from 'react'
import {Modal,Row,Button} from 'react-bootstrap'
import classes from './TicketModal.module.css'
import { Formik, Form, Field } from 'formik';
import {useAuth} from '../../../components/AuthProvider'
import {firestore} from "../../../firebase"
import {useCount} from '../../../context/count'
function validateUsername(value){
  let error;
  if(!value){
error='Required'
  }
  return error;
}

 function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}
function validatePhone(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[0-9]{10}$/i.test(value)) {
    error = 'Invalid phone no';
  }
  return error;
}


function TicketModal(props){
   
  const [userdata,setUserData]=useState({})
const [submitted,setSubmitted]=useState(false)
 const {count,increment}=useCount()
  const {currentUser}=useAuth()
  useEffect(()=>{
return increment()
  },[])
  useEffect(() => {
   firestore.collection('users').doc(currentUser.email).get()
   .then((doc)=>{
     if(doc.exists){
     
      setUserData(doc.data())
      
     }else{
       console.log("no doc")
     }
   }).catch((err)=>console.log(err))
    
  }, [userdata])
  return(
    <>
        
        <Modal show={props.show} 
onHide={props.handleClose} 
     >
      <Modal.Header closeButton  style={{backgroundColor:'rgba(185, 184, 184,0.4)'}}>
        <Modal.Title style={{backgroundColor:'black',width:'100%',textAlign:'center',color:'white',borderRadius:'60px',boxShadow:'8px 8px gray'}}>Raise Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor:'rgba(185, 184, 184,0.4)'}}>

    <Formik
   initialValues={{
     email:'',
     phoneno:'',
     name:'',
     complaint:''

   }}
   
      onSubmit={values => {
       if(currentUser.email===values.email){
         
          firestore.collection('users').doc(currentUser.email).update({

            Name:values.name,
            PhoneNo:values.phoneno,
           
      ticket:[...userdata.ticket,{ticketNo:count,Issue:values.complaint, date:new Date().toLocaleDateString("en-US")}]
          })
          .then(function() {
            setSubmitted(true)
            props.handleClose()
            
        })
        .catch(function(error) {
          console.log(error)
        });
        
       }
       else{
alert('Email Id provided doesnt match with your currently logged in Email id')
       }
      }}
    >

   
   
    {({ errors, touched, isValidating }) => (
         <Form>
        
<Row>
           <label className={classes.Label}>Name</label></Row>
           <Row>
           <Field 
           className={errors.name && touched.name?classes.errorfield:classes.field}
          
           name="name" validate={validateUsername} />
           { touched.name && <div className={classes.error}>{errors.name}</div>}
           </Row>
           <Row>
             <label htmlFor="email" className={classes.Label}>Email</label></Row>
             <Row>
           <Field name="email" 
           className={errors.email && touched.email?classes.errorfield:classes.field}
           autoComplete="off"
           validate={validateEmail} />
           {errors.email && touched.email && <div className={classes.error}>{errors.email}</div>}
           </Row>
           <Row>
           <label className={classes.Label}>Phone No</label></Row>
           <Row>
           <Field 
           className={errors.phoneno && touched.phoneno?classes.errorfield:classes.field}
           name="phoneno" validate={validatePhone}  />
           {errors.phoneno && touched.phoneno && <div className={classes.error}>{errors.phoneno}</div>}
           </Row>
           <Row>
           <label className={classes.Label}>Write your complaint</label></Row>
           <Row>
           
           <Field 
          as ="textarea" rows="5" cols="5"
           className={errors.phoneno && touched.phoneno?classes.errorfield:classes.field}
           name="complaint"  />
           {touched.complaint && <div className={classes.error}>{errors.phoneno}</div>}
           </Row>
          
           <Button type="submit">Submit</Button>
           
         </Form>
       )}
        </Formik>
  </Modal.Body>
         
         </Modal>
         
  
         </>
  )
}


export default TicketModal