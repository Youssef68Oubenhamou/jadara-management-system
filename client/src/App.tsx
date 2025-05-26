
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';
import Event from './pages/student/event'
import Events from './pages/admin/event'

const queryClient = new QueryClient();



export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark">

                    <Layout>
                        <Routes>
                            <Route path="/stuCourses" element={<StudentCourses />} />
                            <Route path="/student/:courseId" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                            <Route path="/stuEvents" element={<Event />} />
                            <Route path="/admEvents" element={<Events />} />
                        </Routes>
                    </Layout>

                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}