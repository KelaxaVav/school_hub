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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { SchoolSelect } from "./components/school-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/layout";
import { useForm, Controller } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  gender: z.string(),
  image: z.string().url({
    message: "Please enter a valid image URL.",
  }),
  fatherName: z.string(),
  motherName: z.string(),
  nicNumber: z.string(),
  indexNo: z.string(),
  dateOfBirth: z.date(),
  addressNo: z.string(),
  addressStreet: z.string(),
  addressTown: z.string(),
  addressCity: z.string(),
  admissionDate: z.date(),
  leavingDate: z.date().optional(),
  grade: z.string(),
  stream: z.string(),
  location: z.string(),
  previousSchools: z.array(
    z.object({
      school: z.string(),
      from: z.date(),
      to: z.date(),
    })
  ).optional(),
});

export default function CreateStudentPage() {

  const { toast } = useToast();
  const [previousSchools, setPreviousSchools] = useState<
    { school: string; from: Date | undefined; to: Date | undefined }[]
  >([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      email: "",
      gender: "",
      image: "",
      fatherName: "",
      motherName: "",
      nicNumber: "",
      indexNo: "",
      dateOfBirth: new Date(),
      addressNo: "",
      addressStreet: "",
      addressTown: "",
      addressCity: "",
      admissionDate: new Date(),
      leavingDate: undefined,
      grade: "",
      stream: "",
      location: "",
      previousSchools: [],
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "Student created.",
      description: `Student "${data.name}" has been created.`,
    });
  };

  const handleAddSchool = () => {
    setPreviousSchools([
      ...previousSchools,
      { school: "", from: undefined, to: undefined },
    ]);
  };

  const handleSchoolChange = (
    index: number,
    field: string,
    value: string | Date | undefined
  ) => {
    const updatedSchools = [...previousSchools];
    if (field === "school") {
      updatedSchools[index] = { ...updatedSchools[index], school: value as string };
    } else if (field === "from") {
      updatedSchools[index] = { ...updatedSchools[index], from: value as Date | undefined };
    } else if (field === "to") {
      updatedSchools[index] = { ...updatedSchools[index], to: value as Date | undefined };
    }
    setPreviousSchools(updatedSchools);
  };

  return (
    <Layout hideNavigation={true}>
      <div className="container py-4">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Create Student</CardTitle>
            <CardDescription>Enter student details to create a new student.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
              {/* First Column */}
              <div>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                     <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input id="name" placeholder="Student Name" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fatherName" className="text-right">
                      Father's Name
                    </Label>
                     <Controller
                      name="fatherName"
                      control={control}
                      render={({ field }) => (
                        <Input id="fatherName" placeholder="Father Name" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="motherName" className="text-right">
                      Mother's Name
                    </Label>
                    <Controller
                      name="motherName"
                      control={control}
                      render={({ field }) => (
                        <Input id="motherName" placeholder="Mother Name" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="addressNo" className="text-right">
                      Address No
                    </Label>
                     <Controller
                      name="addressNo"
                      control={control}
                      render={({ field }) => (
                        <Input id="addressNo" placeholder="Address No" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="addressStreet" className="text-right">
                      Address Street
                    </Label>
                    <Controller
                      name="addressStreet"
                      control={control}
                      render={({ field }) => (
                        <Input id="addressStreet" placeholder="Address Street" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="addressTown" className="text-right">
                      Address Town
                    </Label>
                     <Controller
                      name="addressTown"
                      control={control}
                      render={({ field }) => (
                        <Input id="addressTown" placeholder="Address Town" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="addressCity" className="text-right">
                      Address City
                    </Label>
                     <Controller
                      name="addressCity"
                      control={control}
                      render={({ field }) => (
                        <Input id="addressCity" placeholder="Address City" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                     <Controller
                      name="image"
                      control={control}
                      render={({ field }) => (
                        <Input id="image" placeholder="Image URL" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="grade" className="text-right">
                      Grade
                    </Label>
                     <Controller
                      name="grade"
                      control={control}
                      render={({ field }) => (
                        <Input id="grade" placeholder="Grade" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                 
                </div>
              </div>

              {/* Second Column */}
              <div>
                <div className="grid gap-4 py-4">
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nicNumber" className="text-right">
                      NIC Number
                    </Label>
                     <Controller
                      name="nicNumber"
                      control={control}
                      render={({ field }) => (
                        <Input id="nicNumber" placeholder="NIC Number" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                     <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input type="email" id="email" placeholder="Email" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right">
                      Gender
                    </Label>
                     <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Input id="gender" placeholder="Gender" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="indexNo" className="text-right">
                      Index No
                    </Label>
                     <Controller
                      name="indexNo"
                      control={control}
                      render={({ field }) => (
                        <Input id="indexNo" placeholder="Index No" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stream" className="text-right">
                      Stream
                    </Label>
                    <Controller
                      name="stream"
                      control={control}
                      render={({ field }) => (
                        <Input id="stream" placeholder="Stream" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <Input id="location" placeholder="Location" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dateOfBirth" className="text-right">
                      Date of Birth
                    </Label>
                     <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="admissionDate" className="text-right">
                      Admission Date
                    </Label>
                    <Controller
                      name="admissionDate"
                      control={control}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="leavingDate" className="text-right">
                      Leaving Date
                    </Label>
                    <Controller
                      name="leavingDate"
                      control={control}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  </div>

                    <div>
                      <Label>Previous Schools</Label>
                      {previousSchools.map((school, index) => (
                        <div key={index} className="grid grid-cols-4 items-center gap-4 py-2">
                          <Label htmlFor={`previousSchool-${index}`} className="text-right">
                            School {index + 1}
                          </Label>
                          <SchoolSelect
                            id={`previousSchool-${index}`}
                            value={school.school}
                            onChange={(value) =>
                              handleSchoolChange(index, "school", value)
                            }
                            className="col-span-3"
                          />
                          <Label htmlFor={`previousSchoolFrom-${index}`} className="text-right">
                            From
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[120px] pl-3 text-left font-normal",
                                  !school.from && "text-muted-foreground"
                                )}
                              >
                                {school.from ? (
                                  format(school.from, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={school.from}
                                onSelect={(date) =>
                                  handleSchoolChange(index, "from", date)
                                }
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <Label htmlFor={`previousSchoolTo-${index}`} className="text-right">
                            To
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[120px] pl-3 text-left font-normal",
                                  !school.to && "text-muted-foreground"
                                )}
                              >
                                {school.to ? (
                                  format(school.to, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={school.to}
                                onSelect={(date) => handleSchoolChange(index, "to", date)}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      ))}
                      <Button type="button" variant="secondary" onClick={handleAddSchool}>
                        Add School
                      </Button>
                    </div>
                 
                </div>
              </div>
              <Button type="submit" className="ml-auto">Create Student</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
