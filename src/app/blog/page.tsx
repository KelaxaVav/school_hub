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
import { useRouter } from "next/navigation";
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


interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

const columns = [
  {
    id: "rowNumber",
    label: "#",
  },
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
  {
    id: "actions",
    label: "Actions",
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
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Layout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage blog posts.</CardDescription>
          <Button variant="outline" onClick={() => router.push("/create-blog-post")}>
              Add Post
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
                       <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80%]" />
                      </TableCell>
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
                mockBlogPosts.map((post, index) => (
                  <TableRow key={post.id}>
                     <TableCell>{index + 1}</TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the blog post
                              and remove their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 text-red-50">Delete</AlertDialogAction>
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
    </Layout>
  );
}

