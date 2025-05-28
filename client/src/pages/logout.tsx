import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Logout = () => {

    const navigate = useNavigate();
    
    localStorage.removeItem("token");
    localStorage.clear();
    useEffect(() => {

        navigate("/login");

    } , [])
    
    return (
        <></>
    )
}

export default Logout
