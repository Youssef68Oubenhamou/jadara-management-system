import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';
import { useState } from "react";
import AdminCourses from "./pages/admin/adminCourses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/logout";


// const queryClient = new QueryClient();

const App = () => {

    const [ isAdmin , setIsAdmin ] = useState("admin");

    return (
        // <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark">
                    <Layout>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/stuCourses" element={isAdmin == "admin" ? <AdminCourses /> : <StudentCourses />} />
                            <Route path="/student/:courseId" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                        </Routes>
                    </Layout>
                </ThemeProvider>
            </BrowserRouter>
            // <ReactQueryDevtools initialIsOpen={false} />
        // </QueryClientProvider>
    )
}

export default App