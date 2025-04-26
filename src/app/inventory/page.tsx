"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";

export default function InventoryPage() {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Inventory management content here */}
          <p>Manage school inventory.</p>
        </CardContent>
      </Card>
    </Layout>
  );
}
