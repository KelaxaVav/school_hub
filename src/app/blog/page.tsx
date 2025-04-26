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
