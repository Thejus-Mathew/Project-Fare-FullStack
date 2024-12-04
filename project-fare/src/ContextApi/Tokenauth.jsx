import React, { createContext, useEffect, useState } from 'react'


export const tokenAuthContext = createContext()

function Tokenauth({children}) {
    const[isAuthorized,setIsAuthorized] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorized(true)
        }else{
            setIsAuthorized(false)
        }
    },[isAuthorized])

    

  return (
    <div>
        <tokenAuthContext.Provider value={{isAuthorized,setIsAuthorized}}>
            {children}
        </tokenAuthContext.Provider>
    </div>
  )
}

export default Tokenauth
