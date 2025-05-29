// import { useEffect, useState } from "react"
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card"
// import {
//   Avatar,
//   AvatarFallback,
// } from "@/components/ui/avatar"

// interface User {
//   username: string
//   email: string
//   group: number
// }

// const StudentList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([])

//   useEffect(() => {
//     // Replace this URL with your actual API endpoint
//     fetch("http://localhost:5000//users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Failed to fetch users:", error))
//   }, [])

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Team Members</CardTitle>
//         <CardDescription>You made 265 sales this month.</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {users.map((user, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Avatar>
//                 <AvatarFallback>
//                   {user.username
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="text-sm font-medium">{user.username}</p>
//                 <p className="text-xs text-muted-foreground">{user.email}</p>
//               </div>
//             </div>
//             <p className="text-sm font-medium">Group {user.group}</p>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }

// export default StudentList

// import { useEffect, useState } from "react"

// interface User {
//   username: string
//   email: string
//   group: number
// }

// const StudentList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchUsers = () => {
//         const token = localStorage.getItem("token")
        
//         console.log(token);// or from context

//         fetch("http://localhost:5000/users", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//             .then((res) => {

//                 return res.json();

//             })
//             .then((data) => {

//                 setUsers(data);

//             })
//             .catch((err) => {

//                 console.log(err);

//             })
//     }

//     fetchUsers()
//   }, [])

//   if (loading) return <p>Loading...</p>

//   return (
//     <div>
//       {users.map((user, index) => (
//         <div key={index}>
//           <h2>{user.username}</h2>
//           <p>{user.email}</p>
//           <p>Group: {user.group}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default StudentList


import type React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom"

interface User {
  username: string
  email: string
  group: number
  avatarUrl?: string // optional image
}

const users: User[] = [
  {
    username: "Olivia Martin",
    email: "olivia.martin@email.com",
    group: 1,
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=olivia",
  },
  {
    username: "Jackson Lee",
    email: "jackson.lee@email.com",
    group: 2,
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=jackson",
  },
  {
    username: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    group: 3,
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=isabella",
  },
  {
    username: "William Kim",
    email: "will@email.com",
    group: 2,
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=will",
  },
  {
    username: "Sofia Davis",
    email: "sofia.davis@email.com",
    group: 1,
    avatarUrl: "https://api.dicebear.com/7.x/lorelei/svg?seed=sofia",
  },
]

const UserList: React.FC = () => {

  const authContext = useContext(AuthContext);

  if (!authContext) {

    console.log("An error Occured when wrapping the App component with the Provider !");

  }

  const { token , loading } = authContext;

  if (loading) {
      return null;
  }

  if (!token) {
      return <Navigate to="/login" replace />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback>
                  {user.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <p className="text-sm font-medium">Group {user.group}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default UserList
