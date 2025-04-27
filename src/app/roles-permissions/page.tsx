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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "react-toastify";
import { customFetch } from "@/lib/utils";

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
  id: number;
  role_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
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

const fetchRoles = async (): Promise<Role[]> => {

  try {
    const response = await customFetch("/role");
    const data = await response.json();
    if (data.status) {
      return data.data;
    } else {
      toast.error(data.meta.message || "Failed to fetch roles.");
      return [];
    }
  } catch (error: any) {
    toast.error(error.message || "An error occurred while fetching roles.");
    return [];
  }
};

const fetchPermissions = async (): Promise<Permission[]> => {
  try {
    const response = await customFetch( "/permission");
    const data = await response.json();
    if (data.status) {
      return data.data;
    } else {
      toast.error(data.meta.message || "Failed to fetch permissions.");
      return [];
    }
  } catch (error: any) {
    toast.error(
      error.message || "An error occurred while fetching permissions."
    );
    return [];
  }
};

const updateRolePermissions = async (
  roleId: string,
  permissionIds: string[]
): Promise<void> => {
  try {
    const response = await customFetch(`/role/${roleId}/permission`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permissions: permissionIds }),
      }
    );

    const data = await response.json();
    if (response.ok && data.status) {
      toast.success(data.meta.message || "Permissions updated successfully!");
    } else {
      toast.error(data.meta.message || "Failed to update permissions.");
    }
  } catch (error: any) {
    toast.error(
      error.message || "An error occurred while updating permissions."
    );
  }
};

const updateRole = async (role_id: string, name: string): Promise<void> => {
  try {
    const response = await customFetch(`/role/${role_id}`, {
        method: "PUT",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (response.ok && data.status) {
      toast.success("Role updated successfully!");
    } else {
      toast.error(data.meta.message || "Failed to update role.");
    }
  } catch (error: any) {
    toast.error(
      error.message || "An error occurred while updating the role."
    );
  }
};




export default function RolesPermissionsPage() {
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm<z.infer<typeof RoleSchema>>({
        resolver: zodResolver(RoleSchema), });
  const token = useSelector((state: any) => state.user.token);

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

  useEffect(() => {
    if (selectedRole) {
      const fetchCurrentPermissions = async () => {
        try {
          setLoadingPermissions(true);
          const response = await customFetch("/role/"+selectedRole
          );
          const data = await response.json();
          setLoadingPermissions(false);
          if (data.status) {
            setPermissions(data.data.permissions);

            return data.data;
          } else {
            toast.error(data.meta.message || "Failed to fetch permissions.");
            return [];
          }
         
        } catch (error: any) {
          toast.error(
            error.message || "An error occurred while fetching permissions."
          );
          return [];
        }
      };

      fetchCurrentPermissions();
    }
  }, [selectedRole]);


  const selectedPermissionsHandler = () => {
    if(selectedRole === null) return;
    let selectedPermissions: string[] = [];
    selectedPermissions = Object.entries(permissions).flatMap(([category, actions]) =>
      Object.entries(actions)
        .filter(([action, { value }]) => value === 1) 
        .map(([action, { permission_id }]) => permission_id) 
    );
    setSelectedPermissions(selectedPermissions);
  }
  

  const onDeleteRole = async (role_id: string) => {
    try {
      const response = await customFetch(`/role/${role_id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok && data.status) {
        toast.success("role deleted successfully!");
        // Remove the role from the roles list in the UI
        setRoles(roles.filter((role) => role.role_id !== role_id));
      } else {
        toast.error(data.meta.message || "Failed to delete role.");
      }
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while deleting the role."
      );
    }
   
    

  };

    const handleUpdateRole = async (role_id: string, name: string) => {
        const updateRoleHandler = async () => {
            try {
                await updateRole(role_id, name);
                const updatedRoles = roles.map((role) => {
                    if (role.role_id === role_id) {
                        return { ...role, name };
                    }
                    return role;
                });
                setRoles(updatedRoles);
            } catch (error: any) {
                toast.error(error.message);
            }
        };
        await updateRoleHandler();
    }

  const handleSavePermissions = async () => {
    selectedPermissionsHandler();
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

  const handleCheckboxChange = (permission_name: string, action_name: string) => {
    setPermissions((prevPermissions) => {
    return {
      ...prevPermissions,
      [permission_name]: {
        ...prevPermissions[permission_name],
        [action_name]: {
          ...prevPermissions[permission_name][action_name],
          value: prevPermissions[permission_name][action_name].value === 1 ? 0 : 1,
        },
      },
    };
  });
  // selectedPermissionsHandler();
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Role</DialogTitle>
                              <DialogDescription>
                                Update the name of the role here.
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit((data) => handleUpdateRole(role.role_id.toString(), data.name))}>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="name" className="text-right">Name</Label>
                                      <Input id="name" defaultValue={role.name} className="col-span-3" {...register("name")} />
                                  </div>
                                  <Button type="submit">Update</Button>
                                </div>
                            </form>
                          </DialogContent>
                        </Dialog>



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
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the role and remove their
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 text-red-50"
                              onClick={() => onDeleteRole(role.role_id)}
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
                    <SelectItem key={role.role_id} value={role.role_id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>CREATE</TableHead>
                  <TableHead>DELETE</TableHead>
                  <TableHead>EDIT</TableHead>
                  <TableHead>VIEW</TableHead>
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
                  Object.entries(permissions).map(
                    ([permission_name, permission], index) => (
                      <TableRow key={index + 1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{permission_name}</TableCell>
                            {
                            ["create", "edit", "delete", "view"].map((action) => (
                              <TableCell key={action}>
                                {permission[action] ? (
                                  <Checkbox
                                    id={permission[action].permission_id}
                                    checked={permission[action].value}
                                    onCheckedChange={() => handleCheckboxChange(permission_name, action)}
                                  />
                                ) : null}
                              </TableCell>
                            ))
                          }
                      </TableRow>
                    )
                  )
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
