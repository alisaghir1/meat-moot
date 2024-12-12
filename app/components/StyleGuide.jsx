'use client'

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import Link from "next/link";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const StyleGuide = () => {
  const [date, setDate] = React.useState()

  return (
    <div className="flex flex-col gap-y-4 p-24">
      <h1>1</h1>
      <h2>2</h2>
      <h3>3</h3>
      <p>lorem ipsem</p>
      <div className="bg-black p-24 flex flex-col gap-y-4">
      <Link href='/'>link</Link>
      <Button variant='default'>button 1</Button>
      <Button variant='orange'>button 2</Button>
      <Button variant='input'>button 3</Button>

      <div>
        <Label htmlFor='firstname'>First name</Label>
        <Input type='firstname' id='firstname'/>
      </div>
      <div>
        <Label htmlFor='lastname'>Last name</Label>
        <Input type='lastname' id='lastname'/>
      </div>
      <div>
        <Label>
          Date
        </Label>
     <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"input"}
          className={cn(
            "w-full justify-start text-left font-normal",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <div>
    <Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
    </div>
      </div>
      </div>
    </div>
  );
};

export default StyleGuide;
