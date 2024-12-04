import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

// register

export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${serverURL}/register`,user,"")
}


// login

export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${serverURL}/login`,user,"")
}


// add project
export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/addproject`,reqBody,reqHeader)
}

// get home project
export const getHomeProjectApi = async()=>{
    return await commonAPI("GET",`${serverURL}/homeproject`,"","")
}

// get User project
export const getUserProjectApi = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/userprojects`,"",reqHeader)
}

// get All project
export const getAllProjectApi = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/allprojects?search=${searchKey}`,"",reqHeader)
}

// edit project
export const editProjectApi = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/projects/edit/${id}`,reqBody,reqHeader)
}


// edit project
export const deleteProjectApi = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/projects/delete/${id}`,{},reqHeader)
}


// edit profile
export const updateProfileApi = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/updateprofile`,reqBody,reqHeader)
}


// get profile
export const getProfileApi = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/getprofile`,"",reqHeader)
}
