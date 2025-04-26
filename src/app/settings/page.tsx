"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const createStream = async (name: string): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Stream "${name}" created.`);
      resolve();
    }, 500);
  });
};

const createSchool = async (name: string): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`School "${name}" created.`);
      resolve();
    }, 500);
  });
};

const createSubject = async (name: string): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Subject "${name}" created.`);
      resolve();
    }, 500);
  });
};

const createCategory = async (name: string): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Category "${name}" created.`);
      resolve();
    }, 500);
  });
};


export default function SettingsPage() {
   const { toast } = useToast();

  // Stream Form
  const streamForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { control: streamControl, handleSubmit: handleStreamSubmit, reset: resetStreamForm } = streamForm;

  const handleCreateStream = async (data: z.infer<typeof FormSchema>) => {
    await createStream(data.name);
    toast({
      title: "Stream created.",
      description: `Stream "${data.name}" has been created.`,
    });
    resetStreamForm();
  };

  // School Form
  const schoolForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { control: schoolControl, handleSubmit: handleSchoolSubmit, reset: resetSchoolForm } = schoolForm;

  const handleCreateSchool = async (data: z.infer<typeof FormSchema>) => {
    await createSchool(data.name);
    toast({
      title: "School created.",
      description: `School "${data.name}" has been created.`,
    });
    resetSchoolForm();
  };

    // Subject Form
  const subjectForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { control: subjectControl, handleSubmit: handleSubjectSubmit, reset: resetSubjectForm } = subjectForm;

   const handleCreateSubject = async (data: z.infer<typeof FormSchema>) => {
    await createSubject(data.name);
    toast({
      title: "Subject created.",
      description: `Subject "${data.name}" has been created.`,
    });
    resetSubjectForm();
  };

  // Category Form
  const categoryForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { control: categoryControl, handleSubmit: handleCategorySubmit, reset: resetCategoryForm } = categoryForm;

   const handleCreateCategory = async (data: z.infer<typeof FormSchema>) => {
    await createCategory(data.name);
    toast({
      title: "Category created.",
      description: `Category "${data.name}" has been created.`,
    });
    resetCategoryForm();
  };

  return (
    <Layout>
      <div className="cards-container">
        <Card className="w-1/4">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Stream Settings</CardTitle>
            <CardDescription>Manage your stream settings.</CardDescription>
          </CardHeader>
          <CardContent>
           <form onSubmit={handleStreamSubmit(handleCreateStream)} className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="streamName" className="text-right">
                  Stream Name
                </Label>
                 <Controller
                      name="name"
                      control={streamControl}
                      render={({ field }) => (
                         <Input id="streamName" placeholder="Stream Name" className="col-span-3" {...field} />
                      )}
                    />
              </div>
              <Button type="submit">Create Stream</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="w-1/4">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>School Settings</CardTitle>
            <CardDescription>Manage your school settings.</CardDescription>
          </CardHeader>
          <CardContent>
           <form onSubmit={handleSchoolSubmit(handleCreateSchool)} className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schoolName" className="text-right">
                  School Name
                </Label>
                 <Controller
                      name="name"
                      control={schoolControl}
                      render={({ field }) => (
                         <Input id="schoolName" placeholder="School Name" className="col-span-3" {...field} />
                      )}
                    />
              </div>
              <Button type="submit">Create School</Button>
            </form>
          </CardContent>
        </Card>

         <Card className="w-1/4">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Subject Settings</CardTitle>
            <CardDescription>Manage your Subject settings.</CardDescription>
          </CardHeader>
          <CardContent>
           <form onSubmit={handleSubjectSubmit(handleCreateSubject)} className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subjectName" className="text-right">
                  Subject Name
                </Label>
                 <Controller
                      name="name"
                      control={subjectControl}
                      render={({ field }) => (
                         <Input id="subjectName" placeholder="Subject Name" className="col-span-3" {...field} />
                      )}
                    />
              </div>
              <Button type="submit">Create Subject</Button>
            </form>
          </CardContent>
        </Card>

         <Card className="w-1/4">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Category Settings</CardTitle>
            <CardDescription>Manage your Category settings.</CardDescription>
          </CardHeader>
          <CardContent>
           <form onSubmit={handleCategorySubmit(handleCreateCategory)} className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryName" className="text-right">
                  Category Name
                </Label>
                 <Controller
                      name="name"
                      control={categoryControl}
                      render={({ field }) => (
                         <Input id="categoryName" placeholder="Category Name" className="col-span-3" {...field} />
                      )}
                    />
              </div>
              <Button type="submit">Create Category</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
