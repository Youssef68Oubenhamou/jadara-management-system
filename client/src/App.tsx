import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';
import UserList from "./pages/student/studentdashboard";
import AdminPage from "./pages/admin/admindashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Event from './pages/student/event'
import Events from './pages/admin/event'
import Logout from "./pages/logout";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import AdminCourses from "./pages/admin/adminCourses";


export default function App() {

    const authContext = useContext(AuthContext);

    if (!authContext) {

        console.log("An error Occured related to context , please check if the App is wraped by the Provider !");

    }

    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark">
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/stuCourses" element={localStorage.getItem("user-type") == "admin" ? <AdminCourses /> : <StudentCourses />} />
                        <Route path="/student/:courseId" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                        <Route path="/stuClass" element={localStorage.getItem("user-type") == "admin" ? <AdminPage /> : <UserList/>} />
                        <Route path="/stuEvents" element={localStorage.getItem("user-type") == "admin" ? <Events /> : <Event />} />
                    </Routes>
                </Layout>
            </ThemeProvider>
        </BrowserRouter>
    )
}