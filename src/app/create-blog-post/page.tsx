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
import { EditorContent, EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import { Image as TiptapImage } from '@tiptap/extension-image'

const placeholder = Placeholder.configure({
    placeholder: ({ node, view, getPos }) => {
        return "Write something…";
    },
});

export default function CreateBlogPost() {
    const [category, setCategory] = useState("");
    const [grade, setGrade] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<File | null>(null); // Changed to File type
    const [content, setContent] = useState("");
     const { toast } = useToast();

      const editor = useEditor({
        extensions: [StarterKit, placeholder,TiptapImage],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

      const handleCreatePost = () => {
    toast({
      title: "Blog created.",
      description: `Blog "${title}" has been created.`,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        } else {
            setImage(null);
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
                        <Label htmlFor="image">Image Upload</Label>
                         <Input type="file" id="image" onChange={handleImageChange} />
                          {image && (
                            <img
                              src={URL.createObjectURL(image)}
                              alt="Uploaded Image"
                              className="mt-2 w-32 h-auto"
                            />
                          )}
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <EditorProvider editor={editor}>
                            <EditorContent editor={editor} />
                        </EditorProvider>
                    </div>
                     <Button onClick={handleCreatePost}>Create Post</Button>
                </CardContent>
            </Card>
        </Layout>
    );
}


