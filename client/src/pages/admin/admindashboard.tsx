// import React, { useContext, useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button"; // Import Button if you’re using shadcn/ui
// import { AuthContext } from "../../context/AuthContext";
// import { Navigate } from "react-router-dom";

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   password: string;
//   group: number;
//   role_id: string;
// }

// const UserList: React.FC = () => {
//   const authContext = useContext(AuthContext);
//   const [users, setUsers] = useState<User[]>([]);

//   if (!authContext) {
//     console.log("An error occurred when wrapping the App component with the Provider!");
//   }

//   const { token, loading } = authContext;

//   useEffect(() => {
//     fetch("http://localhost:5000/users", {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           console.log("An error occurred when trying to fetch!");
//         }
//         return res.json();
//       })
//       .then((info) => {
//         if (info.data) {
//           setUsers(info.data);
//           console.log(info.message);
//         }
//       })
//       .catch((err) => {
//         console.log("hello from the error phase!");
//         console.log(err);
//       });
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await fetch(`http://localhost:5000/users/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.ok) {
//         setUsers(users.filter((user) => user._id !== id));
//         console.log("User deleted successfully");
//       } else {
//         console.error("Failed to delete user");
//       }
//     } catch (err) {
//       console.error("Error deleting user:", err);
//     }
//   };

//   const handleUpdate = (user: User) => {
//     // Placeholder - you can navigate to a form or open a modal
//     console.log("Update user:", user);
//   };

//   if (loading) return null;
//   if (!token) return <Navigate to="/login" replace />;

//   const filteredUsers = users.filter((user) => {

//     return user.email !== "smta25@gmail.com";

//   })

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle>Students</CardTitle>
//         <CardDescription>
//           You have {users.length} students!!
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {filteredUsers.map((user) => (
//           <div
//             key={user._id}
//             className="flex items-center justify-between border rounded p-3"
//           >
//             <div>
//               <p className="text-sm font-medium">{user.username}</p>
//               <p className="text-xs text-muted-foreground">{user.email}</p>
//               <p className="text-xs">Group {user.group}</p>
//             </div>
//             <div className="space-x-2">
//               <Button
//                 className="bg-green-600 text-white hover:bg-green-700"
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleUpdate(user)}
//               >
//                 Update
//               </Button>
//               <Button
//                 className="bg-red-600 text-white hover:bg-red-700"
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => handleDelete(user._id)}
//               >
//                 Delete
//               </Button>
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };

// export default UserList;




import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  group: number;
  role_id: string;
}

const UserList: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (!authContext) {
    console.log("Auth context not found.");
  }

  const { token, loading } = authContext;

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users.");
        return res.json();
      })
      .then((info) => {
        if (info.data) setUsers(info.data);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/usr/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setUsers(users.filter((user) => user._id !== id));
        console.log("User deleted successfully");
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const openUpdateDialog = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(`http://localhost:5000/usr/update/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedUser),
      });

      if (res.ok) {
        const updatedUsers = users.map((user) =>
          user._id === selectedUser._id ? selectedUser : user
        );
        setUsers(updatedUsers);
        setOpenDialog(false);
        console.log("User updated successfully");
      } else {
        console.error("Failed to update user");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return null;
  if (!token) return <Navigate to="/login" replace />;

  const filteredUsers = users.filter((user) => user.email !== "smta25@gmail.com");

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            You have {filteredUsers.length} students!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between border rounded p-3"
            >
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <p className="text-xs">Group {user.group}</p>
              </div>
              <div className="space-x-2">
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  size="sm"
                  onClick={() => openUpdateDialog(user)}
                >
                  Update
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Update Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Student</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <Input
                placeholder="Username"
                value={selectedUser.username}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Group"
                value={selectedUser.group}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    group: Number(e.target.value),
                  })
                }
              />
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button onClick={() => setOpenDialog(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleUpdateSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserList;





