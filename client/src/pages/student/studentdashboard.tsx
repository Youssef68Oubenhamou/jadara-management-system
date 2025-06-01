import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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

  if (!authContext) {
    console.log("An error occurred when wrapping the App component with the Provider!");
  }

  const { token, loading } = authContext;

    useEffect(() => {
      
        fetch("http://localhost:5000/users" , {

            method: "GET",
            mode: "cors",
            headers: {

              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`

            },
            credentials: "include"

        })
            .then((res) => {

                if (!res.ok) {

                  console.log("An error occured when trying to fetch !");
                  
                }
                return res.json();

            })
            .then((info) => {

                if (info.data) {

                    setUsers(info.data);
                    console.log(info.message);

                }

            })
            .catch((err) => {

                console.log("hello from the error phase !");
                console.log(err);

            })

    } , [token]);

    const studentGroup = localStorage.getItem("student-group");

    console.log(studentGroup);

    const filteredMates = users.filter((e) => {
        return e.group == Number(studentGroup);
    })

    console.log(filteredMates);
    

  if (loading) return null;
  if (!token) return <Navigate to="/login" replace />;
  // if (error) return <p>{error}</p>;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Classmates</CardTitle>
        <CardDescription>
          You have {filteredMates.length} classmates in your group
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {filteredMates && filteredMates.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <p className="text-sm font-medium">Group {user.group}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserList;

// import React, { useContext, useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
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
//   const [classmates, setClassmates] = useState<User[]>([]);

//   if (!authContext) {
//     console.log("An error occurred when wrapping the App component with the Provider!");
//     return null;
//   }

//   const { token, loading, user } = authContext;
//   console.log("Current user from context:", user);


//   useEffect(() => {
//     if (!token || !user) return;

//     fetch("http://localhost:5000/users", {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         Authorization: `Bearer ${token}`,
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
//            console.log("✅ All users fetched from API:", info.data); 
//           setUsers(info.data);

//           const filteredClassmates = info.data.filter(
//             (u: User) =>Number( u.group) === Number ( user.group) && u._id !== user._id
//           );
//           setClassmates(filteredClassmates);
//           console.log("Fetched classmates:", filteredClassmates);
//         }
//       })
//       .catch((err) => {
//         console.log("hello from the error phase!");
//         console.log(err);
//       });
//   }, [token, user]);

//   if (loading) return null;
//   if (!token) return <Navigate to="/login" replace />;

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Classmates</CardTitle>
//           <CardDescription>
//             You have {classmates.length} classmates in your group
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {classmates.length > 0 ? (
//             users.map((user, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium">{user.username}</p>
//                   <p className="text-xs text-muted-foreground">{user.email}</p>
//                 </div>
//                 <p className="text-sm font-medium">Group {user.group}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No classmates found in your group.</p>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UserList;

