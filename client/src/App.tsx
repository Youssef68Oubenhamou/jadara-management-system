import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';
import UserList from "./pages/student/studentdashboard";
import AdminPage from "./pages/admin/admindashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Event from './pages/student/event'
import Events from './pages/admin/event'


export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark">
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/stuCourses" element={<StudentCourses />} />
                        <Route path="/student/:courseId" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                        <Route path="/student" element={<UserList/>} />
                        <Route path="/admin" element={<AdminPage/>} />
                        <Route path="/stuEvents" element={<Event />} />
                        <Route path="/admEvents" element={<Events />} />
                    </Routes>
                </Layout>

            </ThemeProvider>
        </BrowserRouter>
    )
}