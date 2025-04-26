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
import { useForm, Controller } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loading from "@/components/Loading";
import { login } from '@/redux/features/userSlice';
import { setLoading } from '@/redux/features/loadingSlice';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
     defaultValues: {
      username: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      router.push("/"); // Redirect to dashboard if already logged in
    }
  }, [router]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    dispatch(setLoading(true));

    try {
      const response = await fetch('https://api.puthukkulammv.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status) {
        toast({
          title: "Login successful.",
          description: "Redirecting to dashboard...",
        });

        localStorage.setItem("token", result.meta.access_token);
        setIsLoggedIn(true);
         // Dispatch login action to update Redux store
        dispatch(login({
          username: result.data.username,
          token: result.meta.access_token,
          userData: result.data, // Store the entire user data
        }));
        router.push("/"); // Redirect to dashboard on successful login
      } else {
        toast({
          variant: "destructive",
          title: "Login failed.",
          description: result.message || "Invalid username or password.",
        });
      }
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: "Login failed.",
        description: error.message || "An error occurred during login.",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (isLoggedIn) {
    return null; // Don't render login form if already logged in
  }

  return (
    
      <div className="container py-4 h-screen flex items-center justify-center">
        {isLoading && <Loading />}
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
              <Button type="submit" className="ml-auto">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    
  );
}
