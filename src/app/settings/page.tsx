"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [streamName, setStreamName] = useState("");
  const { toast } = useToast();

  const handleCreateStream = () => {
    // Ideally, you would send this data to your backend to create the stream.
    // For this example, we'll just show a success message.
    toast({
      title: "Stream created.",
      description: `Stream "${streamName}" has been created.`,
    });
    setStreamName(""); // Clear the input after creating the stream.
  };

  return (
    <Layout>
      <Card>
        <CardHeader className="space-y-0 pb-2">
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your stream settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="streamName" className="text-right">
                Stream Name
              </Label>
              <Input
                id="streamName"
                value={streamName}
                onChange={(e) => setStreamName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <Button onClick={handleCreateStream}>Create Stream</Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
