"use client";

import { Edit, Trash} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";
import { customFetch } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader, CardTitle, CardDescription
} from '@/components/ui/card';
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Label } from "@radix-ui/react-label";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 2 characters.", }),
  address: z.string().min(1, "Address is required"),
});

const StreamFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 2 characters.",
  }),
});

const SubjectFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 2 characters.",
  }),
});

const CategoryFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 2 characters.",
  }),
});
interface School {
  name: string;
  address: string;
}
const EditFormSchema = z.object({
  name: z.string().min(1, "School Name is required"),
  address: z.string().min(1, "Address is required"),
});

const createStream = async (name: string) => {
  console.log(`Stream "${name}" created.`);
};

  
const createSchool = async (name: string, address: string): Promise<School> => {
  try {
    const response = await customFetch(`/school`, {
          method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error;
  }
};


const deleteSchool = async (id: number): Promise<void> => {
  try {
    await customFetch(`/school/${id}`, {
          method: "DELETE",
    });
    toast.success("School deleted successfully");
  } catch (error: any) {
    toast.error("Error deleting school");
    throw error;
  }
};

const getSchools = async (): Promise<School[]> => {
  try {
    const response = await customFetch(`/school`, { method: "GET" });
    toast.success("Schools fetched successfully");
    const data = await response.json();
    return data.data;
  } catch (error) {
    toast.error("Error fetching schools");
    throw error;
  }
};

const editSchool = async (school: School) => {
  try {
    await customFetch(`/school/${school.name}`, {
          method: "PUT",
      body: JSON.stringify(school),
    });
    toast.success("School updated successfully");
  } catch (error: any) {
    toast.error("Error updating school");
    throw error;
  }
};
const createSubject = async (name: string) => {
  // Simulate an API call
    console.log(`Subject "${name}" created.`);
  
};

const createCategory = async (name: string) => {
  // Simulate an API call
    console.log(`Category "${name}" created.`);
  };


interface EditSchoolDialogProps {
  school: School;
  schools: School[];
  setSchools: (schools: School[]) => void;

  onSubmit: (values: any) => void;
}

const EditSchoolDialog: React.FC<EditSchoolDialogProps> = ({
  school,
  schools,
  onSubmit,
  setSchools
}) => {
  const form = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      name: school.name,
      address: school.address,
    },
  });
  const { handleSubmit } = form;

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit School</DialogTitle>
          <DialogDescription>Make changes to your school here.</DialogDescription>
        </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <FormField control={form.control} name="name" render={({ field }) => (<FormItem className="col-span-3">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" placeholder="School Name" {...field} />
                </FormControl>
              </FormItem>)} />
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                </FormItem>)} />
            <DialogFooter><Button type="submit">Submit</Button></DialogFooter>
            </form>
          </Form>
        </DialogContent>
        
    </Dialog>
  );
};


export default function SettingsPage() {
  // Stream Form
  const streamForm = useForm<z.infer<typeof StreamFormSchema>>({
    defaultValues: {
      name: "",
    },
  });
  const [schools, setSchools] = useState<School[]>([]);
  useEffect(() => {
    getSchools()
      .then(setSchools)
      .catch((error) => {
        console.error("Failed to fetch schools:", error);
      });
  }, []);

  const handleDelete = async (school: School) => {
    try {
      await deleteSchool(school.school_id);
      setSchools(schools.filter((s) => s.school_id !== school.school_id));
    } catch (error) {
      console.error("Failed to fetch schools:", error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const {
    control: streamControl,
    handleSubmit: handleStreamSubmit,
    reset: resetStreamForm,
  } = streamForm;

  const handleCreateStream = async (data: z.infer<typeof StreamFormSchema>) => {
    await createStream(data.name);
    toast.success(`Stream "${data.name}" has been created.`);
    resetStreamForm();
  };

  // School Form
  const schoolForm = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema),
        defaultValues: {
      name: "",
      address: "",
    },
  });

  const [schoolToEdit, setSchoolToEdit] = useState<School | null>(null);
  
  const {
    control: schoolControl,
    handleSubmit: handleSchoolSubmit,
    reset: resetSchoolForm,
  } = schoolForm;

  const handleCreateSchool = async (data: z.infer<typeof FormSchema>) => {    
    try {
       const school = await createSchool(data.name, data.address);
      setSchools([...schools, school]);      toast.success(`School "${data.name}" has been created.`);
    } catch (e) {
      // Optionally, handle errors here (e.g., display an error toast)
      console.error("Failed to fetch schools:", e);
    resetSchoolForm();
  };

  // Subject Form
  const subjectForm = useForm<z.infer<typeof SubjectFormSchema>>({
    defaultValues: {
      name: "",
    },
  });

  const {
    control: subjectControl,
    handleSubmit: handleSubjectSubmit,
    reset: resetSubjectForm,
  } = subjectForm;
  const handleCreateSubject = async (data: z.infer<typeof SubjectFormSchema>) => {
    await createSubject(data.name);
    toast.success(`Subject "${data.name}" has been created.`);

    resetSubjectForm();
  }; 
    const handleSubmitEdit = async (values: z.infer<typeof EditFormSchema>) => {
        const updatedSchool = { ...schoolToEdit, ...values } as School;
        await editSchool(updatedSchool);
        setSchools(schools.map((school) => (school.name === updatedSchool.name ? updatedSchool : school)));
        setSchoolToEdit(null);
    };



  // Category Form
  const categoryForm = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    control: categoryControl,
    handleSubmit: handleCategorySubmit,
    reset: resetCategoryForm,
  } = categoryForm;
  const handleCreateCategory = async (data: z.infer<typeof CategoryFormSchema>) => {
    await createCategory(data.name);
    toast.success(`Category "${data.name}" has been created.`);

    resetCategoryForm();
  };
  
  };

  return (
    <>
    <Layout>
      <div className="cards-container">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Stream Settings</CardTitle>
            <CardDescription>Manage your stream settings.</CardDescription>
          </CardHeader>
          <CardContent><Form {...streamForm}><form onSubmit={handleStreamSubmit(handleCreateStream)} className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <FormField
            control={streamForm.control}
            name="name"
            render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel htmlFor="streamName">Stream Name</FormLabel>
                  <FormControl>
                      <Input
                      id="streamName"
                      placeholder="Stream Name"
                      className="col-span-3"
                        {...field} />
                    </FormControl>
                </FormItem>)} /></div>
          <Button type="submit">Create Stream</Button>
        </form></Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>School Settings</CardTitle>

            <CardDescription>Manage your school settings.</CardDescription>
          </CardHeader>
          <CardContent><Form {...schoolForm}>
            <form onSubmit={handleSchoolSubmit(handleCreateSchool)} className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <FormField
            control={schoolForm.control}
            name="name"
            render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel htmlFor="schoolName">School Name</FormLabel>
                  <FormControl>
                      <Input
                      id="schoolName"
                      placeholder="School Name"
                      className="col-span-3"
                        {...field} />
                    </FormControl>
                </FormItem>)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <FormField
              control={schoolForm.control}
              name="address"
              render={({ field }) => (
                  <FormItem className="col-span-3">
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <FormControl>
                  <Input
                      id="address"
                      placeholder="Address"
                      className="col-span-3"{...field} />
                    </FormControl>
                </FormItem>)} />
            </div>
            <Button type="submit">Create School</Button>
            </form></Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Subject Settings</CardTitle>
            <CardDescription>Manage your Subject settings.</CardDescription>
          </CardHeader>
          <CardContent><Form {...subjectForm}>
            <form onSubmit={handleSubjectSubmit(handleCreateSubject)} className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <FormField
              control={subjectForm.control}
              name="name"
              render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel htmlFor="subjectName">Subject Name</FormLabel>
                    <FormControl>
                      <Input
                        id="subjectName"
                        placeholder="Subject Name"
                        className="col-span-3" {...field} />
                      </FormControl>
                  </FormItem>)} />
            </div>
            <Button type="submit">Create Subject</Button>
            </form></Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Category Settings</CardTitle>
            <CardDescription>Manage your Category settings.</CardDescription>
          </CardHeader>
          <CardContent><Form {...categoryForm}>
            <form onSubmit={handleCategorySubmit(handleCreateCategory)} className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <FormField
              control={categoryForm.control}
              name="name"
              render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel htmlFor="categoryName">Category Name</FormLabel>
                    <FormControl>
                      <Input
                        id="categoryName"
                        placeholder="Category Name"
                        className="col-span-3"{...field} />
                      </FormControl>
                  </FormItem>)} />
            </div>
            <Button type="submit">Create Category</Button>
            </form></Form>
          </CardContent>
        </Card>
      </div>
      <div className="cards-container mt-10">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Streams</CardTitle>
            <CardDescription>Manage Streams.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>Stream 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">2</TableCell>
                  <TableCell>Stream 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3</TableCell>
                  <TableCell>Stream 3</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Schools</CardTitle>
            <CardDescription>Manage Schools.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table className="w-full">
                  <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px]">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>                {schools.map((school) => (
                    <TableRow key={school.name}>
                      <TableCell className="font-medium">#</TableCell>
                      <TableCell>{school.name}</TableCell>
                      <TableCell>{school.address}</TableCell>
                      <TableCell className="text-right"> <Button onClick={() => setSchoolToEdit(school)} variant="ghost">Edit</Button>
                          <Button variant="ghost">Delete</Button></TableCell>
                    </TableRow>))}
            
                  
             
              </TableBody> 
              </Table>
            </CardContent>
        </Card>
        {schoolToEdit && <Dialog open={!!schoolToEdit} onOpenChange={() => setSchoolToEdit(null)}>
          <DialogTrigger asChild hidden>
            <Button>Edit</Button>
          </DialogTrigger>
          <EditSchoolDialog 
            school={schoolToEdit} 
          onSubmit={editSchool}
          schools={schools}
          setSchools={setSchools}/>
          <DialogClose><Button variant="ghost">Close</Button></DialogClose>

        </Dialog>}        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Subjects</CardTitle>
            <CardDescription>Manage Subjects.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>Subject 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">2</TableCell>
                  <TableCell>Subject 2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="cards-container mt-10">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Category</CardTitle>
            <CardDescription>Manage Category.</CardDescription>
          </CardHeader>
          <CardContent>

            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>Category 1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
        <ToastContainer />
    </>
  );
}

