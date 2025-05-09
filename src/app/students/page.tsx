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
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Layout} from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import Link from "next/link";
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
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.string(),
  nicNumber: z.string(),
  grade: z.string(),
  stream: z.string(),
});

interface Student {
  id: string;
  image: string;
  indexNo: string;
  name: string;
  gender: string;
  nicNumber: string;
  grade: string;
  stream: string;
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
    id: "indexNo",
    label: "Index No",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "nicNumber",
    label: "NIC",
  },
  {
    id: "grade",
    label: "Grade",
  },
  {
    id: "stream",
    label: "Stream",
  },
  {
    id: "actions",
    label: "Actions",
  },
];

const customFetch = async (url: string, options: RequestInit = {}) => {
  // Check if the URL is the login route
  if (url.includes('/api/auth/login')) {
    // If it's the login route, don't add the token
    return fetch(url, options);
  }

  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // If there's a token, add it to the headers
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Call the original fetch function
  return fetch(url, options);
};


const fetchStudents = async (): Promise<Student[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockStudents: Student[] = [
        {
          id: "1",
          image: "https://picsum.photos/50/50",
          indexNo: "12345",
          name: "John Doe",
          gender: "Male",
          nicNumber: "123456789V",
          grade: "10th",
          stream: "Science",
        },
        {
          id: "2",
          image: "https://picsum.photos/50/50",
          indexNo: "67890",
          name: "Jane Smith",
          gender: "Female",
          nicNumber: "987654321V",
          grade: "11th",
          stream: "Commerce",
        },
        {
          id: "3",
         image: "https://picsum.photos/50/50",
          indexNo: "13579",
          name: "Alice Johnson",
          gender: "Female",
          nicNumber: "112233445V",
          grade: "9th",
          stream: "Arts",
        },
      ];
      resolve(mockStudents);
    }, 500);
  });
};

const deleteStudent = async (id: string): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Deleted student with id: ${id}`);
      resolve();
    }, 500);
  });
};

export default function StudentsPage() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();
  const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { handleSubmit } = form;

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      const studentData = await fetchStudents();
      setStudents(studentData);
      setLoading(false);
    };

    loadStudents();
  }, []);

  const onDelete = async (id: string) => {
    await deleteStudent(id);
    setStudents(students.filter((student) => student.id !== id));
    toast({
      title: "Student deleted.",
      description: "The student has been deleted successfully.",
    });
  };

  return (
    <Layout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Students</CardTitle>
            <CardDescription>Manage student records.</CardDescription>
          </div>
          <Button variant="outline" onClick={() => router.push("/create-student")}>
            <Plus className="mr-2 h-4 w-4" /> Add Student
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
                      {Array.from({length: columns.length - 2}).map((_, j) => (
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
                students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{student.indexNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.nicNumber}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.stream}</TableCell>
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
                              This action cannot be undone. This will permanently delete the student
                              and remove their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 text-red-50" onClick={() => onDelete(student.id)}>Delete</AlertDialogAction>
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
