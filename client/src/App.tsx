import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {

  const [ token , setToken ] = useState(localStorage.getItem('access-token'));

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark">

                    <Layout>
                        <Routes>
                            <Route path="/login" element={<Login setToken={setToken} />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/stuCourses" element={<StudentCourses />} />
                            <Route path="/student/:courseId" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                        </Routes>
                    </Layout>

                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App