// // App.tsx
// import React from "react";
// import CarouselSize from "@/components/eventStudent.";
// import EventStudent from "@/components/eventStudent.";
// import Event from "./pages/student/event";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';

const queryClient = new QueryClient();

// function App() {
//   return (
//     <div className="p-10">
//       <h1 className="text-2xl mb-4">My Carousel</h1>
//       <CarouselSize size="lg">
//         {[<EventStudent />, <Event />, <EventStudent />]}
//       </CarouselSize>
//     </div>
//   );
// }

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark">

                    <Layout>
                        <Routes>
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