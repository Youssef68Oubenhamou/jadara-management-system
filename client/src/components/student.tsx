// import type React from "react"
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

// interface UserListProps {
//   users:User[]
// }
// const UserList: React.FC<UserListProps> = ({users}) => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Teammates:</CardTitle>
//         {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {users.map((user, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Avatar>
//                 {/* <AvatarImage src={user.avatarUrl} alt={user.username} /> */}
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

// export default UserList