import React,{useContext,useState,useEffect} from 'react'
import {auth} from '../firebase'
const AuthContext=React.createContext()


export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser]=useState()
    const [loading,setLoading]=useState()
    var count=0;

const signup=(email,password)=>{
return auth.createUserWithEmailAndPassword(email,password)
    }

    const login=(email,password)=>{
        return auth.signInWithEmailAndPassword(email,password)
            }   
useEffect(() => {
    auth.onAuthStateChanged(user=>{
       
        setCurrentUser(user)
        setLoading(false)
    })
   
   
}, [])
   
    const value={
        currentUser,
        signup,
        login,
        count
    }
return(

    <AuthContext.Provider value={value}>

{!loading && children}
    </AuthContext.Provider>
)
}