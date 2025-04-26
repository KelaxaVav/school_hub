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
  const [schoolName, setSchoolName] = useState("");
  const { toast } = useToast();

  const handleCreateStream = () => {
    toast({
      title: "Stream created.",
      description: `Stream "${streamName}" has been created.`,
    });
    setStreamName("");
  };

  const handleCreateSchool = () => {
    toast({
      title: "School created.",
      description: `School "${schoolName}" has been created.`,
    });
    setSchoolName("");
  };

  return (
    <Layout>
      <div className="grid gap-4">
        <Card className="w-1/4">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Stream Settings</CardTitle>
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

        <Card className="w-1/4">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>School Settings</CardTitle>
            <CardDescription>Manage your school settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schoolName" className="text-right">
                  School Name
                </Label>
                <Input
                  id="schoolName"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <Button onClick={handleCreateSchool}>Create School</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
