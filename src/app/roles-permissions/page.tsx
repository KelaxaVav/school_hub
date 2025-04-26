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
import { Edit, Trash } from "lucide-react";
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
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/features/loadingSlice";
import { toast } from 'react-toastify';


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
  role_id:string;
  name: string;
}

interface Permission {
  permission_id: string;
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

const fetchRoles = async (token: string | null): Promise<Role[]> => {
  try {
    const response = await fetch('https://api.puthukkulammv.com/api/roles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status) {
      return data.data;
    } else {
      toast.error(data.message || "Failed to fetch roles.");
      return [];
    }
  } catch (error: any) {
    toast.error(error.message || "An error occurred while fetching roles.");
    return [];
  }
};

const fetchPermissions = async (token: string | null): Promise<Permission[]> => {
  try {
    const response = await fetch('https://api.puthukkulammv.com/api/permissions', {
       headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status) {
      return data.data;
    } else {
      toast.error(data.message || "Failed to fetch permissions.");
      return [];
    }
  } catch (error: any) {
    toast.error(error.message || "An error occurred while fetching permissions.");
    return [];
  }
};

const updateRolePermissions = async (roleId: string, permissionIds: string[]): Promise<void> => {
  try {
    const response = await fetch(`https://api.puthukkulammv.com/api/role/${roleId}/permission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ permission_ids: permissionIds }),
    });

    const data = await response.json();
    if (response.ok && data.status) {
      toast.success(data.message || "Permissions updated successfully.");
    } else {
      toast.error(data.message || "Failed to update permissions.");
    }
  } catch (error: any) {
    toast.error(error.message || "An error occurred while updating permissions.");
  }
};


export default function RolesPermissionsPage() {
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);


  useEffect(() => {
    const loadRoles = async () => {
      setLoadingRoles(true);
      const rolesData = await fetchRoles(token);
      setRoles(rolesData);
      setLoadingRoles(false);
    };

    const loadPermissions = async () => {
      setLoadingPermissions(true);
      const permissionsData = await fetchPermissions(token);
      setPermissions(permissionsData);
      setLoadingPermissions(false);
    };

    loadRoles();
    loadPermissions();
  }, [token]);

    useEffect(() => {
    if (selectedRole) {
      // Fetch the current permissions for the selected role (replace with your API endpoint)
      const fetchCurrentPermissions = async () => {
        setLoadingPermissions(true);
        //const permissionsData = await fetchPermissions(); // Replace with API call
        // Implement logic to filter the permission according to role

        setLoadingPermissions(false);
      };

      fetchCurrentPermissions();
    }
  }, [selectedRole]);

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
        setPermissions(permissions.filter((permission) => permission.permission_id !== id));
        toast({
          title: "Permission deleted.",
          description: "The permission has been deleted successfully.",
        });
        resolve(true);
      }, 500);
    });
  };

    const handlePermissionChange = (permissionId: string) => {
        setSelectedPermissions((prev) => {
            if (prev.includes(permissionId)) {
                return prev.filter((id) => id !== permissionId);
            } else {
                return [...prev, permissionId];
            }
        });
    };

    const handleSavePermissions = async () => {
      if (!selectedRole) {
        toast.error("Please select a role.");
        return;
      }

      dispatch(setLoading(true));
      try {
        await updateRolePermissions(selectedRole, selectedPermissions);
        toast.success("Permissions updated successfully!");
      } finally {
        dispatch(setLoading(false));
      }
    };

  return (
    <Layout>
      <div className="flex-responsive">
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
                    <TableRow key={role.role_id}>
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
             <div>
                <Label htmlFor="role">Select Role</Label>
                <Select onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.role_id} value={role.role_id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
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
                    <TableRow key={permission.permission_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{permission.name}</TableCell>
                      <TableCell>{permission.description}</TableCell>
                      <TableCell>
                         <Checkbox
                            id={permission.permission_id}
                            checked={selectedPermissions.includes(permission.permission_id)}
                            onCheckedChange={() => handlePermissionChange(permission.permission_id)}
                          />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
             <Button onClick={handleSavePermissions}>Save Permissions</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
