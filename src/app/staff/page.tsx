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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "role",
    label: "Role",
  },
];


const fetchStaffMembers = async (): Promise<StaffMember[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockStaffMembers: StaffMember[] = [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          role: "Teacher",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "Principal",
        },
        {
          id: "3",
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          role: "Assistant",
        },
      ];
      resolve(mockStaffMembers);
    }, 500);
  });
};

export default function StaffPage() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
    const router = useRouter();


  useEffect(() => {
    const loadStaffMembers = async () => {
      setLoading(true);
      const staffData = await fetchStaffMembers();
      setStaffMembers(staffData);
      setLoading(false);
    };

    loadStaffMembers();
  }, []);

  const handleAddStaff = () => {
    setOpen(false);
    toast({
      title: "Staff added.",
      description: "Your staff has been added to the system.",
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
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          <Skeleton className="h-4 w-[80%]" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                staffMembers.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.role}</TableCell>
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


