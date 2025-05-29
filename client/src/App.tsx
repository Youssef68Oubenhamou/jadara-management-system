import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';
// import StudentList from "./pages/student/studentdashboard"
import UserList from "./pages/student/studentdashboard";
import AdminPage from "./pages/admin/admindashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";


const App = () => {

  const [ token , setToken ] = useState(localStorage.getItem('access-token'));

    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark">

                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login setToken={setToken} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/stuCourses" element={<StudentCourses />} />
                        <Route path="/student/:courseId" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                        <Route path="/student" element={<UserList/>} />
                        <Route path="/admin" element={<AdminPage/>} />
                    </Routes>
                </Layout>

            </ThemeProvider>
        </BrowserRouter>

    )
}

export default App