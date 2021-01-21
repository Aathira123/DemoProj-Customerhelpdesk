import React,{useState,useContext} from 'react'
export const MyContext = React.createContext()

export function useCount(){
    return useContext(MyContext)
}
export function CountProvider({children}) {
   
  const [count, updateCount] = useState(0)
  function increment() {
    updateCount(count + 1)
  }
  const value={
count,
increment
  }
  return(
      <MyContext.Provider value={value}>
{children}
      </MyContext.Provider>
  )
}
export default CountProvider