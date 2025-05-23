import Header from "./header";
import type { PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-gradient-to-br from-background to-muted" >
            <SidebarProvider>

                <AppSidebar />
                <Header />
                <main className="min-h-screen container mx-auto px-4 py-28" >

                    { children }

                </main>
            </SidebarProvider>
            <footer className="border-t backdrop-blur py-12 supports-[backdrop-filer]:bg-background/60" >

                <div className="container mx-auto px-4 text-center text-gray-400" >

                    <p>Made by SPARADRA</p>

                </div>

            </footer>
        </div>

    )
}

export default Layout;
