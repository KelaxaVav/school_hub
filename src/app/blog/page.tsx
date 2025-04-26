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
import { Textarea } from "@/components/ui/textarea";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

const columns = [
  {
    id: "title",
    label: "Title",
  },
  {
    id: "author",
    label: "Author",
  },
  {
    id: "date",
    label: "Date",
  },
];


const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "School Trip to the Museum",
    content: "Today, students visited the local museum...",
    author: "John Doe",
    date: "2024-08-01",
  },
  {
    id: "2",
    title: "New Science Lab Opened",
    content: "We are excited to announce the opening of our new science lab...",
    author: "Jane Smith",
    date: "2024-08-05",
  },
];

export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleAddPost = () => {
    setOpen(false);
    toast({
      title: "Post added.",
      description: "Your blog post has been added.",
    });
  };


  return (
    <Layout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage blog posts.</CardDescription>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Blog Post</DialogTitle>
                <DialogDescription>
                  Create a new blog post.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" defaultValue="" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Content
                  </Label>
                  <Textarea id="content" defaultValue="" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right">
                    Author
                  </Label>
                  <Input id="author" defaultValue="" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input id="date" defaultValue="" className="col-span-3" />
                </div>
              </div>
              <Button type="submit" onClick={handleAddPost}>Add</Button>
            </DialogContent>
          </Dialog>
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
                mockBlogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{post.date}</TableCell>
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
