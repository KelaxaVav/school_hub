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

interface Leave {
  id: string;
  staff_id: string;
  startDate: Date;
  endDate: Date;
  leaveType: string;
  reason: string;
  status: string;
}

const columns = [
  {
    id: "rowNumber",
    label: "#",
  },
  {
    id: "staff_id",
    label: "Staff Id",
  },
  {
    id: "startDate",
    label: "Start Date",
  },
  {
    id: "endDate",
    label: "End Date",
  },
  {
    id: "leaveType",
    label: "Leave Type",
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


const fetchLeaves = async (): Promise<Leave[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockLeaves: Leave[] = [
        {
          id: "1",
          staff_id: "123",
          startDate: new Date(),
          endDate: new Date(),
          leaveType: "Sick Leave",
          reason: "Fever",
          status: "Pending",
        },
        {
          id: "2",
          staff_id: "456",
          startDate: new Date(),
          endDate: new Date(),
          leaveType: "Casual Leave",
          reason: "Personal",
          status: "Approved",
        },
        {
          id: "3",
          staff_id: "789",
          startDate: new Date(),
          endDate: new Date(),
          leaveType: "Annual Leave",
          reason: "Vacation",
          status: "Rejected",
        },
      ];
      resolve(mockLeaves);
    }, 500);
  });
};

const deleteLeave = async (id: string): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Deleted leave with id: ${id}`);
      resolve();
    }, 500);
  });
};

export default function LeavesPage() {
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const router = useRouter();
  const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { handleSubmit } = form;

  useEffect(() => {
    const loadLeaves = async () => {
      setLoading(true);
      const leaveData = await fetchLeaves();
      setLeaves(leaveData);
      setLoading(false);
    };

    loadLeaves();
  }, []);

  const onDelete = async (id: string) => {
    await deleteLeave(id);
    setLeaves(leaves.filter((leave) => leave.id !== id));
    toast({
      title: "Leave deleted.",
      description: "The leave has been deleted successfully.",
    });
  };


  return (
    <Layout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Leaves</CardTitle>
            <CardDescription>Manage Leaves records.</CardDescription>
          </div>
           <Button variant="outline" onClick={() => router.push("/")}>
            <Plus className="mr-2 h-4 w-4" /> Add Leave
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
                      {Array.from({length: columns.length - 1}).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-[80%]" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                leaves.map((leave, index) => (
                  <TableRow key={leave.id}>
                     <TableCell>{index + 1}</TableCell>
                    <TableCell>{leave.staff_id}</TableCell>
                    <TableCell>{format(leave.startDate, "PPP")}</TableCell>
                    <TableCell>{format(leave.endDate, "PPP")}</TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{leave.status}</TableCell>
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
                              This action cannot be undone. This will permanently delete the leave
                              and remove their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 text-red-50"  onClick={() => onDelete(leave.id)}>Delete</AlertDialogAction>
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
