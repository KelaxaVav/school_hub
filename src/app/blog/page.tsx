"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";

export default function BlogPage() {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Blog</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Blog management content here */}
          <p>Create, view, edit, and delete blog posts.</p>
        </CardContent>
      </Card>
    </Layout>
  );
}
