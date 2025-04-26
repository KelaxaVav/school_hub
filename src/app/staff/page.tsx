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
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.string(),
  nic: z.string(),
  dateOfBirth: z.date(),
  teacherGrade: z.string(),
});

interface StaffMember {
  id: string;
  image: string;
  name: string;
  gender: string;
  nic: string;
  dateOfBirth: Date;
  teacherGrade: string;
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
    id: "name",
    label: "Name",
  },
  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "nic",
    label: "NIC",
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
  },
  {
    id: "teacherGrade",
    label: "Grade",
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


const fetchStaffMembers = async (): Promise<StaffMember[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockStaffMembers: StaffMember[] = [
        {
          id: "1",
          image: "https://picsum.photos/50/50",
          name: "John Doe",
          gender: "Male",
          nic: "123456789V",
          dateOfBirth: new Date("1980-05-15"),
          teacherGrade: "Grade I",
        },
        {
          id: "2",
           image: "https://picsum.photos/50/50",
          name: "Jane Smith",
          gender: "Female",
          nic: "987654321V",
          dateOfBirth: new Date("1985-10-20"),
          teacherGrade: "Grade II",
        },
        {
          id: "3",
           image: "https://picsum.photos/50/50",
          name: "Alice Johnson",
          gender: "Female",
          nic: "112233445V",
          dateOfBirth: new Date("1990-03-10"),
          teacherGrade: "Grade III",
        },
      ];
      resolve(mockStaffMembers);
    }, 500);
  });
};

const deleteStaffMember = async (id: string): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Deleted staff member with id: ${id}`);
      resolve();
    }, 500);
  });
};

export default function StaffPage() {
  const [loading, setLoading] = useState(true);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const router = useRouter();
  const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { handleSubmit } = form;

  useEffect(() => {
    const loadStaffMembers = async () => {
      setLoading(true);
      const staffData = await fetchStaffMembers();
      setStaffMembers(staffData);
      setLoading(false);
    };

    loadStaffMembers();
  }, []);

  const onDelete = async (id: string) => {
    await deleteStaffMember(id);
    setStaffMembers(staffMembers.filter((staff) => staff.id !== id));
    toast({
      title: "Staff member deleted.",
      description: "The staff member has been deleted successfully.",
    });
  };


  return (
    <Layout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Staff</CardTitle>
            <CardDescription>Manage staff records.</CardDescription>
          </div>
           <Button variant="outline" onClick={() => router.push("/create-staff")}>
            <Plus className="mr-2 h-4 w-4" /> Add Staff
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
                staffMembers.map((staff, index) => (
                  <TableRow key={staff.id}>
                     <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={staff.image} alt={staff.name} />
                        <AvatarFallback>{staff.name[0]}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.gender}</TableCell>
                    <TableCell>{staff.nic}</TableCell>
                    <TableCell>{format(staff.dateOfBirth, "PPP")}</TableCell>
                    <TableCell>{staff.teacherGrade}</TableCell>
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
                              This action cannot be undone. This will permanently delete the staff
                              and remove their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 text-red-50"  onClick={() => onDelete(staff.id)}>Delete</AlertDialogAction>
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
