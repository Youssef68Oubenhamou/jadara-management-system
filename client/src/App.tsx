<<<<<<< HEAD
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import logo from './jadaralogo-8ba458e5.png';
import { useState } from 'react';

const App = () => {

  const [ token , setToken ] = useState(localStorage.getItem('access-token'));

  return (
    <Router>
      <div className="bg flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm text-center">
          <img src={logo} alt="Logo" className="mb-4 w-24 mx-33" />
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
=======
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Course from './components/course';
import StudentCourses from './pages/student/studentCourses';

const queryClient = new QueryClient();

const App = () => {
>>>>>>> af1779d3ea2580905a750c0ee9b5b833bdce9da0

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

export default App