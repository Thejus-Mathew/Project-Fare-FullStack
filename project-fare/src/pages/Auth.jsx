import React, { useContext, useEffect, useState } from 'react'
import { Form, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import authImage from '../assets/images/authImage.png'
import { loginAPI, registerAPI } from '../services/allAPI'
import { Flip, toast, ToastContainer } from 'react-toastify'
import { tokenAuthContext } from '../ContextApi/Tokenauth'



function Auth({register}) {

    const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)


    const isRegisterForm = register?true:false

    const[userData,setUserData]=useState({
        username:"",
        email:"",
        password:""
    })

    const navigate = useNavigate()

    const handleRegister =async (e) =>{
        e.preventDefault()
        const {username,email,password} = userData
        if(!username || !email || !password) {
            toast.info('fill empty fields', {
                transition: Flip
                });
        }else{
            try{
                const result = await registerAPI(userData)
                console.log(result);
                if(result.status == 200){
                    toast.success(`${result.data.username} registered`)
                    navigate('/login')
                    setUserData({username:"",email:"",password:""})
                }else{
                    toast.warning(`${result.status} ${result.response.data}`)
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    const handleLogin =async (e) =>{
        e.preventDefault()
        const {email,password} = userData
        if(!email || !password) {
            toast.info("fill empty fields")
        }else{
            try{
                const result = await loginAPI({email,password})
                if(result.status == 200){
                    sessionStorage.setItem("username",result.data.existingUser.username)
                    sessionStorage.setItem("token",result.data.token)
                    navigate('/')
                    setUserData({username:"",email:"",password:""})
                    setIsAuthorized(true)
                }else{
                    toast.warning(`${result.status} ${result.response.data}`)
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    


  return (
    <>
      <ToastContainer position="top-center" theme="colored" transition={Flip} />
      <div className="d-flex justify-content-center align-items-center pt-5">
        <div className="container w-75">
            <Link to='/' style={{textDecoration:"none"}} className='my-5 fs-3'>
                <i className="fa-solid fa-arrow-left"></i>
                Back to Home
            </Link>
            <div className="card shadow p-5 mt-3" style={{backgroundColor:"rgb(100,150,200)"}}>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src={authImage} width={"100%"} alt="" />
                    </div>
                    <div className="col-lg-6">
                        <Navbar.Brand className=''>
                            <Link style={{textDecoration:"none",color:"white"}} to={'/'}> <h1><i className="fa-solid fa-list-check me-3"></i>Project Fair</h1> </Link>
                        </Navbar.Brand>
                        <h5 className='text-light text-center mt-4'>
                            {
                                isRegisterForm?"Sign Up to your Account":"Sign In to your Account"
                            }
                        </h5>
                        <Form className='mt-3 w-100'>
                            {
                                isRegisterForm&&
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInputName">
                                    <Form.Control type="text" placeholder="Enter Your Name" onChange={(e)=>setUserData({...userData,username:e.target.value})} value={userData.username}/>
                                </Form.Group>
                            }
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">
                                <Form.Control type="email" placeholder="Enter Your Email" onChange={(e)=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                                <Form.Control type="password" placeholder="Enter Your Password" onChange={(e)=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
                            </Form.Group>
                            {
                                isRegisterForm?
                                <>
                                    <button className='btn btn-dark d-grid' onClick={handleRegister}>Register</button>
                                    <p className='text-light text-end mt-2'>Already have an Account? <Link to={'/login'} style={{textDecoration:"none",fontWeight:"bold",color:"blue",textShadow:"0px 0px 4px rgb(250,250,0)"}}>Login Now</Link></p>
                                </>:
                                <>
                                    <button className='btn btn-dark' onClick={handleLogin}>Login</button>
                                    <p className='text-light text-end mt-2'>New User? <Link to={'/register'} style={{textDecoration:"none",color:"red",fontWeight:"bold",textShadow:"0px 0px 4px rgb(0,250,250)"}}>Register Now</Link></p>
                                </>
                            }
                        </Form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Auth
