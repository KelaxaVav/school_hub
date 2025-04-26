"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout/layout";
import { useForm, Controller } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);

    if (data.username === "admin" && data.password === "password") {
      toast({
        title: "Login successful.",
        description: "Redirecting to dashboard...",
      });

      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed.",
        description: "Invalid username or password.",
      });
    }
  };

  return (
    
      <div className="container py-4 h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your username and password to login.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                 <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <Input id="username" placeholder="Username" className="col-span-3" {...field} />
                      )}
                    />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                 <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input type="password" id="password" placeholder="Password" className="col-span-3" {...field} />
                      )}
                    />
              </div>
              <Button type="submit" className="ml-auto" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    
  );
}

