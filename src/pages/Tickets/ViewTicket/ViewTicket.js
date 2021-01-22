import React,{useEffect,useState} from 'react'
import {firestore} from "../../../firebase"
import {useAuth} from '../../../components/AuthProvider'
import styles from './ViewTicket.module.css'

import {Button} from 'react-bootstrap'
import {auth} from "../../../firebase";
import Icon from '../../../components/Icon/Icon'
import IconClick from '../../iconClick/iconClick'
import {CircularProgress,TableBody,TableCell,TableContainer,TableHead,TableRow,Table,Paper} from '@material-ui/core'
import {ArrowBackIosRounded} from '@material-ui/icons'

export default function ViewTicket(props) {

const {currentUser}=useAuth()
const [currentuser,setCurrent]=useState([])
const [ticketarray,setTicket]=useState([]);
const [showIconClick,setIconClick]=useState(false);
const [dispname,setName]=useState('');
const [load,setLoad]=useState(true);

useEffect(()=>{
setCurrent(currentUser)

},[currentUser])

var loading=<CircularProgress color="primary" size='12rem' style={{position:'absolute',top:'45%',left:'35%'}}/>
if(load===false){
    loading=null;
    
}

useEffect(()=>{
  var avataricon=JSON.parse(localStorage.getItem("currentuser"))
  setName(avataricon.displayName[0]);
  
},[])
useEffect(() => {
  let isMounted = true; 
if(currentUser){
  
    let ticketarray=[]
    
    firestore.collection('users').doc(currentUser.email).get()
    .then(function(doc) {
     
        ticketarray=[...doc.data().ticket]
        if(isMounted){
          setLoad(false);
        
          setTicket(ticketarray)
      
       
        }
       }).catch(function(error) {
        console.log("Error getting document:", error);
    });

}
return () => { isMounted = false };
})

const setShowHandler=()=>{
    props.history.replace('/home')

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
    
        ticket:ind.filter((i)=>i.ticketId!==tr.ticketId),
       
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
            <TableCell style={{fontWeight:'bold',fontSize:'large'}}>Ticket Type</TableCell>
              <TableCell style={{fontWeight:'bold',fontSize:'large'}}>Tickets Raised</TableCell>
              <TableCell style={{fontWeight:'bold',fontSize:'large'}}>Date when ticket raised</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketarray.map((row) => (
              <TableRow key={row.ticketId}>
                   <TableCell component="th" scope="row">
                  {row.IssueType}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.Issue}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell component="th" scope="row">
               <Button className={styles.btn} onClick={()=>deleteTicket(row)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>)
}

    return (
      <React.Fragment>
       

<div style={{position:'relative'}}>
<Icon dispname={dispname} setIconClick={setIconClick} showIconClick={showIconClick}/>
{showIconClick? 
   <IconClick signout={signouthandler} useremail={currentuser.email}/>
   
   :null}</div>
        <div className={styles.view}>
            <h2>Tickets you have Raised</h2>
            {loading}
            <Button className={styles.btn2} onClick={setShowHandler}><ArrowBackIosRounded/> </Button>
           {res}
          
          
    </div>
   
    </React.Fragment>
 
    )
}
