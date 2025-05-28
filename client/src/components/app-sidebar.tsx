import { Calendar, Home, Inbox, Search, Settings , LogOut } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

// Menu items.
const items = [
  {
    title: "Events",
    url: "#",
    icon: Home,
  },
  {
    title: "Courses",
    url: "/stuCourses",
    icon: Inbox,
  },
  {
    title: "Users",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
]


export function AppSidebar() {
  
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
      throw new Error("AuthContext is null — make sure <AuthProvider> wraps your app.");
    }
    
    const { token } = authContext;
    
    const filteredIcons = items.filter((e) => {
        if (e.title == "Logout" && !token) {

            return false;

        }

        return true;
    })
    return (
        <Sidebar className="my-24">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {filteredIcons.map((item) => (
                            <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link to={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
  )
}
