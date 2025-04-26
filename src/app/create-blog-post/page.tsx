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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CreateBlogPost() {
    const [category, setCategory] = useState("");
    const [grade, setGrade] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
     const { toast } = useToast();


      const handleCreatePost = () => {
    toast({
      title: "Blog created.",
      description: `Blog "${title}" has been created.`,
    });
  };

    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>Create Blog Post</CardTitle>
                    <CardDescription>Create a new blog post.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={setCategory} defaultValue={category}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="School News">School News</SelectItem>
                                    <SelectItem value="Events">Events</SelectItem>
                                    <SelectItem value="Sports">Sports</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Select onValueChange={setGrade} defaultValue={grade}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Grade 1">Grade 1</SelectItem>
                                    <SelectItem value="Grade 2">Grade 2</SelectItem>
                                    <SelectItem value="Grade 3">Grade 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="image">Image URL</Label>
                        <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[150px]" />
                    </div>
                     <Button onClick={handleCreatePost}>Create Post</Button>
                </CardContent>
            </Card>
        </Layout>
    );
}
