import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react"

const Logout = () => {

    const authContext = useContext(AuthContext);

    if (!authContext) {

        console.log("Error in wrapping the App with the Provider !");

    }

    const { setToken } = authContext;

    const navigate = useNavigate();
    
    useEffect(() => {
        
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");

    } , [])
    
    return (
        <></>
    )
}

export default Logout
