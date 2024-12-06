"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReservationForm = () => {
  const [date, setDate] = useState()

  return (
    <form>
      <div>
        <div className="grid gird-cols-1 xl:grid-cols-2 gap-[30px]">
          <div>
            <Label htmlFor="firstname">first name</Label>
            <Input id="firstname" type="text" />
          </div>
          <div>
            <Label htmlFor="lastname">last name</Label>
            <Input id="lastname" type="text" />
          </div>
          <div>
            <Label htmlFor="persons">how many persons</Label>
            <Input id="persons" type="text" />
          </div>
          <div>
            <Label>Branch</Label>
            <Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Which Branch?" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="ABu-Dhabi-Al-Qana">ABu Dhabi Al Qana</SelectItem>
    <SelectItem value="Dubai-JBR">Dubai JBR</SelectItem>
    <SelectItem value="Dubai-Hills">Dubai Hills</SelectItem>
    <SelectItem value="Dubai-City-Walk">Dubai City Walk</SelectItem>
  </SelectContent>
</Select>
          </div>
        </div>
        <div className="grid mt-[30px] grid-cols-1 xl:grid-cols-1 gap-[30px]">
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"input"}
                  className={cn("w-full justify-start text-left font-normal")}
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
          </div>
 
        </div>
      </div>
      <Button variant='orange' className='font-normal uppercase w-full mt-[30px]  text-center'>
        Submit
      </Button>
    </form>
  );
};

export default ReservationForm;
