"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  grade: z.string().min(2, {
    message: "Grade must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  image: z.string().url({
    message: "Please enter a valid image URL.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

export default function CreateBlogPost() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      grade: "",
      title: "",
      image: "",
      content: "",
    },
  });

  const { control, handleSubmit } = form;

      const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form data submitted:", data);

    toast({
      title: "Blog created.",
      description: `Blog "${data.title}" has been created.`,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // setFieldValue("image", file); // if using Formik
             form.setValue("image", URL.createObjectURL(file)); // Set the value in react-hook-form
            setImagePreview(URL.createObjectURL(file));
        } else {
            form.setValue("image", "");
            setImagePreview(null);
        }
    };


    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>Create Blog Post</CardTitle>
                    <CardDescription>Create a new blog post.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                 <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category">Category</Label>
                             <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="School News">School News</SelectItem>
                                        <SelectItem value="Events">Events</SelectItem>
                                        <SelectItem value="Sports">Sports</SelectItem>
                                    </SelectContent>
                                </Select>
                      )}
                    />
                        </div>
                        <div>
                            <Label htmlFor="grade">Grade</Label>
                              <Controller
                      name="grade"
                      control={control}
                      render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Grade 1">Grade 1</SelectItem>
                                    <SelectItem value="Grade 2">Grade 2</SelectItem>
                                    <SelectItem value="Grade 3">Grade 3</SelectItem>
                                </SelectContent>
                            </Select>
                      )}
                    />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="title">Title</Label>
                         <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <Input id="title" placeholder="Post title" {...field} />
                      )}
                    />
                    </div>
                    <div>
                        <Label htmlFor="image">Image Upload</Label>
                            <Input type="file" id="image" onChange={handleImageChange} />
                              {imagePreview && (
                                <img
                                  src={imagePreview}
                                  alt="Uploaded Image"
                                  className="mt-2 w-32 h-auto"
                                />
                              )}
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                         <Controller
                      name="content"
                      control={control}
                      render={({ field }) => (
                        <Textarea id="content" placeholder="Post content" {...field} />
                      )}
                    />
                    </div>
                     <Button type="submit">Create Post</Button>
                    </form>
                </CardContent>
            </Card>
        </Layout>
    );
}

