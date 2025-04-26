"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {useEffect, useState} from 'react';
import {Skeleton} from '@/components/ui/skeleton';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Layout} from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {format} from "date-fns";

interface User {
  id: string;
  image: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

const columns = [
  {
    id: "rowNumber",
    label: "#",
  },
  {
    id: "image",
    label: "Image",
  },
  {
    id: "username",
    label: "Username",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "role",
    label: "Role",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "actions",
    label: "Actions",
  },
];


const fetchUsers = async (): Promise<User[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: "1",
          image: "https://picsum.photos/50/50",
          username: "johndoe",
          email: "john.doe@example.com",
          role: "Student",
          status: "Active",
        },
        {
          id: "2",
           image: "https://picsum.photos/50/50",
          username: "janesmith",
          email: "jane.smith@example.com",
          role: "Staff",
          status: "Inactive",
        },
        {
          id: "3",
           image: "https://picsum.photos/50/50",
          username: "alicejohnson",
          email: "alice.johnson@example.com",
          role: "Admin",
          status: "Active",
        },
      ];
      resolve(mockUsers);
    }, 500);
  });
};

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();


  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const usersData = await fetchUsers();
      setUsers(usersData);
      setLoading(false);
    };

    loadUsers();
  }, []);

  return (
    <Layout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts and access.</CardDescription>
          </div>
           <Button variant="outline" onClick={() => router.push("/")}>
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <>
                  {Array.from({length: 3}).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                       <TableCell>
                        <Skeleton className="h-10 w-10 rounded-full" />
                      </TableCell>
                      {Array.from({length: columns.length - 3}).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-[80%]" />
                        </TableCell>
                      ))}
                      <TableCell>
                        <Skeleton className="h-4 w-[60%]" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                users.map((user, index) => (
                  <TableRow key={user.id}>
                     <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={user.image} alt={user.username} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the user
                              and remove their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 text-red-50">Delete</AlertDialogAction>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}

