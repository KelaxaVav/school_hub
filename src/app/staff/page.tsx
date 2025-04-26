"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";

export default function StaffPage() {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Staff</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Staff management content here */}
          <p>Manage staff records.</p>
        </CardContent>
      </Card>
    </Layout>
  );
}
