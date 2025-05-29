import { Link } from "react-router-dom"
import { useTheme } from "@/context/context-provider";
import { Moon, Sun } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {

    const { theme , setTheme } = useTheme();

    const isDark = theme === "dark";

    const authContext = useContext(AuthContext);

    if (!authContext) {

        console.log("An error occured in the context , please wrap your App component with the Provider !");

    }

    const { userType } = authContext;

    return (
        <header className="fixed h-24 w-full top-0 z-50 border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60" >
            <div className="container mx-auto flex h-16 items-center justify-between px-4" >
                <Link to="/" >
                    <img src="/logo-jadara.png" alt="Rock Logo" className="h-10" />
                </Link>
                { localStorage.getItem("token") && <h1>You are {userType}</h1> }

                <div onClick={() => setTheme(isDark? "light" : "dark")} 
                    className={`flex items-center cursor-pointer transition-transform duration-500 ${ isDark ? "rotate-180" : "rotate-0" }`}
                    >
                    {

                        isDark ? 
                            (<Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />)
                            :
                            (<Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />)

                    }
                </div>

            </div>
        </header>
    )
}

export default Header