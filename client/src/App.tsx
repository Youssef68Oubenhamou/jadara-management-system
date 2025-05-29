import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';
import { useState } from "react";
import AdminCourses from "./pages/admin/adminCourses";
import Login from "./pages/login";
import Register from "./pages/register";
import Logout from "./pages/logout";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";


const App = () => {

    const [ isAdmin , setIsAdmin ] = useState("admin");

    const authContext = useContext(AuthContext);

    if (!authContext) {

        console.log("An error Occured related to context , please check if the App is wraped by the Provider !");

    }

    const { userType } = authContext;

    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark">
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/stuCourses" element={userType == "admin" ? <AdminCourses /> : <StudentCourses />} />
                        <Route path="/student/:courseId" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                    </Routes>
                </Layout>
            </ThemeProvider>
        </BrowserRouter>

    )
}

export default App