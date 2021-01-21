import React,{useEffect,useState} from 'react'
import {firestore} from "../../../firebase"
import {useAuth} from '../../../components/AuthProvider'
import styles from './ViewTicket.module.css'

import {Button} from 'react-bootstrap'
import {auth} from "../../../firebase";


import {CircularProgress,TableBody,TableCell,TableContainer,TableHead,TableRow,Table,Paper} from '@material-ui/core'
import {ArrowBackIosRounded} from '@material-ui/icons'

export default function ViewTicket(props) {

const {currentUser}=useAuth()
const [ticketarray,setTicket]=useState([]);
const [load,setLoad]=useState(true);
var loading=<CircularProgress color="primary" size='12rem' style={{position:'absolute',top:'45%',left:'35%'}}/>
if(load===false){
    loading=null;
    
}


useEffect(() => {

if(currentUser){
    let ticketarray=[]
    
    firestore.collection('users').doc(currentUser.email).get()
    .then(function(doc) {
        ticketarray=[...doc.data().ticket]
     setLoad(false);
     
       setTicket(ticketarray)
       
       
       
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

}
  
    
})

const setShowHandler=()=>{
    props.history.goBack()

}
const signouthandler=()=>{
    auth.signOut()
    .then(()=>{
     
      props.history.replace("/login")
    })
  }
const deleteTicket=(tr)=>{
   
    firestore.collection('users').doc(currentUser.email).get()
    .then((doc)=>{
        const ind=doc.data().ticket
       
        firestore.collection('users').doc(currentUser.email).update({
            
        ticket:ind.filter((i)=>i.ticketNo!==tr.ticketNo)
        })
    })
}
var res=''
if(load===false && ticketarray.length===0){
    res=<h6>You have not raised any ticket </h6>
} 


if(ticketarray.length!==0){

    res=(<TableContainer component={Paper}>
        <Table className={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight:'bold',fontSize:'large'}}>S.No</TableCell>
              <TableCell style={{fontWeight:'bold',fontSize:'large'}}>Tickets Raised</TableCell>
              <TableCell style={{fontWeight:'bold',fontSize:'large'}}>Date when ticket raised</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketarray.map((row) => (
              <TableRow key={row.ticketNo}>
                  <TableCell component="th" scope="row">
                  {row.ticketNo}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.Issue}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
               <Button className={styles.btn} onClick={()=>deleteTicket(row)}>Delete</Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>)
}

    return (
       <div className={styles.view}>

             <Button className = {styles.buttonclass} onClick={signouthandler}>Sign out</Button>
        
            <h2>Tickets you have Raised</h2>
            {loading}
            <Button className={styles.btn2} onClick={setShowHandler}><ArrowBackIosRounded/> </Button>
           {res}
          
          
    </div>
   
  
 
    )
}
