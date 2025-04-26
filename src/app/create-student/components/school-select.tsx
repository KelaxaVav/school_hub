"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SchoolSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
}

export const SchoolSelect: React.FC<SchoolSelectProps> = ({
  value,
  onChange,
  className,
  id,
}) => {
  const schools = ["School A", "School B", "School C", "School D"]; // Replace with actual school data

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={className} id={id}>
        <SelectValue placeholder="Select a school" />
      </SelectTrigger>
      <SelectContent>
        {schools.map((school) => (
          <SelectItem key={school} value={school}>
            {school}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
