"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const metrics = [
  {
    label: "Students",
    value: "1500",
    href: "/students"
  },
  {
    label: "Staff",
    value: "300",
    href: "/staff"
  },
  {
    label: "Inventory Items",
    value: "500",
    href: "/inventory"
  },
  {
    label: "Blog Posts",
    value: "20",
    href: "/blog"
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [router]);

  return (
    <Layout>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Link key={metric.label} href={metric.href}>
            <Card>
              <CardHeader>
                <CardTitle>{metric.label}</CardTitle>
                <CardDescription>Total number of {metric.label.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? <Skeleton className="h-6 w-24" /> : <div className="text-2xl font-bold">{metric.value}</div>}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
