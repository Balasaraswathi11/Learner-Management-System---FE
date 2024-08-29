import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

import toast,{ Toaster } from 'react-hot-toast';
import { server } from "../../main";
const UserContext=createContext()

export const UserContextProvider=({children})=>{
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);


    async function loginUser(email,password,navigate){
        setBtnLoading(true)
        try {
            const { data } = await axios.post(`${server}/api/user/login`, { email, password });
            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error) {
            setBtnLoading(false);
            setIsAuth(false);
            toast.error(error.response?.data?.message || "Login failed");
        }
    }

 async function fetchuser(){
    setLoading(true)
    try {
        const{data}=await axios.get(`${server}/api/user/me`,{
            headers:{
               token:localStorage.getItem("token")
            }
        })

        setIsAuth(true);
        setUser(data.user)
        setLoading(false)

    } catch (error) {
        console.log(error);
      setLoading(false);
    }
 }
 useEffect(() => {
    fetchuser();
  }, []);

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
        const { data } = await axios.post(`${server}/api/user/register`, { name, email, password });
        
        console.log("Token on registration:", data.activationToken);
        localStorage.setItem("activationtoken", data.activationToken);
        toast.success("OTP sent");
        setBtnLoading(false);
        navigate("/verify");
    } catch (error) {
        setBtnLoading(false);
        setIsAuth(false);
        toast.error(error.response?.data?.message || "Registration failed");
    }
}

async function verifyUser(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationtoken");
    
    console.log("Token on verification:", activationToken);
    
    try {
        const { data } = await axios.post(`${server}/api/user/verify`, { otp, activationToken });
        toast.success("OTP verified");
        navigate("/login");
        localStorage.clear();
        setBtnLoading(false);
    } catch (error) {
        toast.error(error.response?.data?.message || "Verification failed");
        setBtnLoading(false);
    }
}

    return <UserContext.Provider value={{user,setUser,setIsAuth,verifyUser,isAuth,registerUser,loginUser,btnLoading,loading,fetchuser}}>
               {children}
               <Toaster />
    </UserContext.Provider>
}

export const UserData=()=>useContext(UserContext)