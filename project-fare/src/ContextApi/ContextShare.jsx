import React, { createContext, useState } from 'react'
export const addProjectContextResponse = createContext()
export const editProjectContextResponse = createContext()

function ContextShare({children}) {
    const[addProjectResponse,setAddProjectResponse]=useState("")
    const[editProjectResponse,setEditProjectResponse]=useState("")
  return (
    <>
    <addProjectContextResponse.Provider value={{addProjectResponse,setAddProjectResponse}}>
    <editProjectContextResponse.Provider value={{editProjectResponse,setEditProjectResponse}}>
        {children}
    </editProjectContextResponse.Provider>
    </addProjectContextResponse.Provider>
    </>
  )
}

export default ContextShare
