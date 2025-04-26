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
import { SchoolSelect } from "@/app/create-student/components/school-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/layout";
import { useForm, Controller } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Select from 'react-select';

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
   confirmPassword: z.string().min(8, {
    message: "Confirm Password must be at least 8 characters.",
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
  nic: z.string(),
  mobile: z.string(),
  dateOfBirth: z.date(),
  street: z.string(),
  town: z.string(),
  city: z.string(),
  appointmentDate: z.date(),
  joinedDate: z.date(),
  subjects: z.array(z.string()),
  teacherGrade: z.string(),
  staffType: z.string(),
  previousSchools: z.array(
    z.object({
      school: z.string(),
      from: z.date(),
      to: z.date(),
    })
  ).optional(),
});

const createStaff = async (data: z.infer<typeof FormSchema>): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Staff data submitted:", data);
      resolve();
    }, 1000);
  });
};

export default function CreateStaffPage() {

  const { toast } = useToast();
  const [previousSchools, setPreviousSchools] = useState<
    { school: string; from: Date | undefined; to: Date | undefined }[]
  >([]);
    const subjects = ["Math", "Science", "English", "History"]; // Replace with actual subject data
      const subjectOptions = subjects.map(subject => ({
    value: subject,
    label: subject,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
       confirmPassword: "",
      email: "",
      gender: "",
      image: "",
      fatherName: "",
      motherName: "",
      nic: "",
      mobile: "",
      dateOfBirth: new Date(),
      street: "",
      town: "",
      city: "",
      appointmentDate: new Date(),
      joinedDate: new Date(),
      subjects: [],
      teacherGrade: "",
      staffType: "",
      previousSchools: [],
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createStaff(data);

    toast({
      title: "Staff created.",
      description: `Staff "${data.name}" has been created.`,
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
            <CardTitle>Create Staff</CardTitle>
            <CardDescription>Enter staff details to create a new staff member.</CardDescription>
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
                        <Input id="name" placeholder="Staff Name" className="col-span-3" {...field} />
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
                    <Label htmlFor="street" className="text-right">
                      Address Street
                    </Label>
                    <Controller
                      name="street"
                      control={control}
                      render={({ field }) => (
                        <Input id="street" placeholder="Address Street" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="town" className="text-right">
                      Address Town
                    </Label>
                     <Controller
                      name="town"
                      control={control}
                      render={({ field }) => (
                        <Input id="town" placeholder="Address Town" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">
                      Address City
                    </Label>
                     <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <Input id="city" placeholder="Address City" className="col-span-3" {...field} />
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
                    <Label htmlFor="teacherGrade" className="text-right">
                      Teacher Grade
                    </Label>
                     <Controller
                      name="teacherGrade"
                      control={control}
                      render={({ field }) => (
                        <Input id="teacherGrade" placeholder="Teacher Grade" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="staffType" className="text-right">
                      Staff Type
                    </Label>
                     <Controller
                      name="staffType"
                      control={control}
                      render={({ field }) => (
                        <Input id="staffType" placeholder="Staff Type" className="col-span-3" {...field} />
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
                    <Label htmlFor="confirmPassword" className="text-right">
                      Confirm Password
                    </Label>
                     <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <Input type="password" id="confirmPassword" placeholder="Confirm Password" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nic" className="text-right">
                      NIC Number
                    </Label>
                     <Controller
                      name="nic"
                      control={control}
                      render={({ field }) => (
                        <Input id="nic" placeholder="NIC Number" className="col-span-3" {...field} />
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
                    <Label htmlFor="mobile" className="text-right">
                      Mobile
                    </Label>
                     <Controller
                      name="mobile"
                      control={control}
                      render={({ field }) => (
                        <Input id="mobile" placeholder="Mobile" className="col-span-3" {...field} />
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="appointmentDate" className="text-right">
                      Appointment Date
                    </Label>
                    <Controller
                      name="appointmentDate"
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
                    <Label htmlFor="joinedDate" className="text-right">
                      Joined Date
                    </Label>
                    <Controller
                      name="joinedDate"
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
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subjects" className="text-right">
                        Subjects
                      </Label>
                      <Controller
                        name="subjects"
                        control={control}
                        render={({ field }) => (
                           <Select
                            isMulti
                            options={subjectOptions}
                            className="col-span-3"
                            onChange={(selectedOptions) => {
                              field.onChange(
                                selectedOptions ? selectedOptions.map((option) => option.value) : []
                              );
                            }}
                            value={subjectOptions.filter((option) =>
                              (field.value || []).includes(option.value)
                            )}
                          />
                        )}
                      />
                    </div>
                </div>
              </div>
              <Button type="submit" className="ml-auto">Create Staff</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

