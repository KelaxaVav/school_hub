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

export default function CreateStudentPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [addressNo, setAddressNo] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressTown, setAddressTown] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [admissionDate, setAdmissionDate] = useState<Date | undefined>(undefined);
  const [leavingDate, setLeavingDate] = useState<Date | undefined>(undefined);
  const [grade, setGrade] = useState("");
  const [stream, setStream] = useState("");
  const [location, setLocation] = useState("");
  const [previousSchools, setPreviousSchools] = useState<
    { school: string; from: Date | undefined; to: Date | undefined }[]
  >([]);

  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Student created.",
      description: `Student "${name}" has been created.`,
    });
    // Handle form submission logic here
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
            <div className="flex">
              <div className="w-1/2 pr-2">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right">
                      Gender
                    </Label>
                    <Input
                      type="text"
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      type="text"
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fatherName" className="text-right">
                      Father's Name
                    </Label>
                    <Input
                      type="text"
                      id="fatherName"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="motherName" className="text-right">
                      Mother's Name
                    </Label>
                    <Input
                      type="text"
                      id="motherName"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="grid gap-4 py-4">
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nicNumber" className="text-right">
                      NIC Number
                    </Label>
                    <Input
                      type="text"
                      id="nicNumber"
                      value={nicNumber}
                      onChange={(e) => setNicNumber(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="indexNo" className="text-right">
                      Index No
                    </Label>
                    <Input
                      type="text"
                      id="indexNo"
                      value={indexNo}
                      onChange={(e) => setIndexNo(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dateOfBirth" className="text-right">
                      Date of Birth
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !dateOfBirth && "text-muted-foreground"
                          )}
                        >
                          {dateOfBirth ? (
                            format(dateOfBirth, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateOfBirth}
                          onSelect={setDateOfBirth}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address No
                    </Label>
                    <Input
                      type="text"
                      id="addressNo"
                      value={addressNo}
                      onChange={(e) => setAddressNo(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="addressStreet" className="text-right">
                      Address Street
                    </Label>
                    <Input
                      type="text"
                      id="addressStreet"
                      value={addressStreet}
                      onChange={(e) => setAddressStreet(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="addressTown" className="text-right">
                      Address Town
                    </Label>
                    <Input
                      type="text"
                      id="addressTown"
                      value={addressTown}
                      onChange={(e) => setAddressTown(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="addressCity" className="text-right">
                      Address City
                    </Label>
                    <Input
                      type="text"
                      id="addressCity"
                      value={addressCity}
                      onChange={(e) => setAddressCity(e.target.value)}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="admissionDate" className="text-right">
                      Admission Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !admissionDate && "text-muted-foreground"
                          )}
                        >
                          {admissionDate ? (
                            format(admissionDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={admissionDate}
                          onSelect={setAdmissionDate}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="leavingDate" className="text-right">
                      Leaving Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !leavingDate && "text-muted-foreground"
                          )}
                        >
                          {leavingDate ? (
                            format(leavingDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={leavingDate}
                          onSelect={setLeavingDate}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="grade" className="text-right">
                      Grade
                    </Label>
                    <Input
                      type="text"
                      id="grade"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stream" className="text-right">
                      Stream
                    </Label>
                    <Input
                      type="text"
                      id="stream"
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
              </div>
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
            <Button onClick={handleSubmit}>Create Student</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
