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
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

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

export default function StudentsPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
                mockStudents.map((student, index) => (
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
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
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

