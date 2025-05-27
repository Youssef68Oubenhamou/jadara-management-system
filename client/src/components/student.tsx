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
  
} from "@/components/ui/avatar"

interface User {
  username: string
  email: string
  group: number
}

const users: User[] = [
  { username: "Olivia Martin", email: "olivia.martin@email.com", group: 1 },
  { username: "Jackson Lee", email: "jackson.lee@email.com", group: 2 },
  { username: "Isabella Nguyen", email: "isabella.nguyen@email.com", group: 3 },
  { username: "William Kim", email: "will@email.com", group: 2 },
  { username: "Sofia Davis", email: "sofia.davis@email.com", group: 1 },
]

const StudentList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col">
        {users.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
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

export default StudentList
