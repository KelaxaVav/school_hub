"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RoleSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const PermissionSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
});

interface Role {
  id: string;
  name: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
}

const columns = [
  {
    id: "rowNumber",
    label: "#",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "actions",
    label: "Actions",
  },
];

const fetchRoles = async (): Promise<Role[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockRoles: Role[] = [
        {
          id: "1",
          name: "Admin",
        },
        {
          id: "2",
          name: "Editor",
        },
        {
          id: "3",
          name: "Viewer",
        },
      ];
      resolve(mockRoles);
    }, 500);
  });
};

const fetchPermissions = async (): Promise<Permission[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockPermissions: Permission[] = [
        {
          id: "1",
          name: "settings.view",
          description: "View settings",
        },
        {
          id: "2",
          name: "settings.edit",
          description: "Edit settings",
        },
        {
          id: "3",
          name: "users.create",
          description: "Create users",
        },
      ];
      resolve(mockPermissions);
    }, 500);
  });
};

export default function RolesPermissionsPage() {
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadRoles = async () => {
      setLoadingRoles(true);
      const rolesData = await fetchRoles();
      setRoles(rolesData);
      setLoadingRoles(false);
    };

    const loadPermissions = async () => {
      setLoadingPermissions(true);
      const permissionsData = await fetchPermissions();
      setPermissions(permissionsData);
      setLoadingPermissions(false);
    };

    loadRoles();
    loadPermissions();
  }, []);

  const onDeleteRole = async (id: string) => {
    // Simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Deleted role with id: ${id}`);
        setRoles(roles.filter((role) => role.id !== id));
        toast({
          title: "Role deleted.",
          description: "The role has been deleted successfully.",
        });
        resolve(true);
      }, 500);
    });
  };

  const onDeletePermission = async (id: string) => {
    // Simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Deleted permission with id: ${id}`);
        setPermissions(permissions.filter((permission) => permission.id !== id));
        toast({
          title: "Permission deleted.",
          description: "The permission has been deleted successfully.",
        });
        resolve(true);
      }, 500);
    });
  };

  return (
    <Layout>
      <div className="cards-container">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Roles</CardTitle>
            <CardDescription>Manage roles.</CardDescription>
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
                {loadingRoles ? (
                  <>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[80%]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[60%]" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  roles.map((role, index) => (
                    <TableRow key={role.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                role and remove their data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 text-red-50"
                              onClick={() => onDeleteRole(role.id)}
                            >
                              Delete
                            </AlertDialogAction>
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

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Manage permissions.</CardDescription>
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
                {loadingPermissions ? (
                  <>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[80%]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[60%]" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  permissions.map((permission, index) => (
                    <TableRow key={permission.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{permission.name}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                permission and remove their data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 text-red-50"
                              onClick={() => onDeletePermission(permission.id)}
                            >
                              Delete
                            </AlertDialogAction>
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
      </div>
    </Layout>
  );
}
