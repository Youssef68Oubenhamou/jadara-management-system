import { useState , useEffect , createContext, type PropsWithChildren } from "react";

interface AuthContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const [ token , setToken ] = useState<string | null>(null);

    const [ loading , setLoading ] = useState<boolean>(true);

    useEffect(() => {

        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLoading(false);

    } , [])

    return (

        <AuthContext.Provider value={{ token , setToken , loading , setLoading }}>

            { children }

        </AuthContext.Provider>

    );

}