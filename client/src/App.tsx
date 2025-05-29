import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';
// import StudentList from "./pages/student/studentdashboard"
import UserList from "./pages/student/studentdashboard";
import AdminPage from "./pages/admin/admindashboard";


const queryClient = new QueryClient();

const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark">

                    <Layout>
                        <Routes>
                            <Route path="/stuCourses" element={<StudentCourses />} />
                            <Route path="/student/:courseId" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                            <Route path="/student" element={<UserList/>} />
                            <Route path="/admin" element={<AdminPage/>} />
                        </Routes>
                    </Layout>

                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App