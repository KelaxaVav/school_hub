"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Layout} from "@/components/layout/layout";

export default function RolesPermissionsPage() {
  return (
    <Layout>
      <Card>
        <CardHeader className="space-y-0 pb-2">
          <CardTitle>Roles &amp; Permissions</CardTitle>
          <CardDescription>Manage roles and permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content for managing roles and permissions will go here */}
          <p>This section is under construction. You will be able to manage roles and permissions here.</p>
        </CardContent>
      </Card>
    </Layout>
  );
}
