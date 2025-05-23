import './App.css';
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Layout from './components/layout';
import { ThemeProvider } from "./context/context-provider";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Course from './components/course';

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark">

                    <Layout>
                        <Routes>
                            <Route path="/" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                            <Route path="student/:studentName" element={<Course title={''} length={0} description={''} content={''} image={''} />} />
                        </Routes>
                    </Layout>

                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App