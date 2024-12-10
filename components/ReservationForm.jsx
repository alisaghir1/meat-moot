"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import emailjs from "emailjs-com";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    persons: "",
    branch: "",
    date: null, // Date object
  });

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle branch selection
  const handleBranchChange = (value) => {
    setFormData((prev) => ({ ...prev, branch: value }));
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  // Send email using EmailJS
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_9dw8n2b",
        "template_z8t1sxm",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          persons: formData.persons,
          branch: formData.branch,
          date: formData.date ? format(formData.date, "PPP") : "Not Selected",
        },
        "bz-racFIdw40qpvrn"
      );

      setFormData({
        firstName: "",
        lastName: "",
        persons: "",
        branch: "",
        date: null,
      });
      setAlertMessage("Thank you for your reservation! We have received your request and will contact you shortly to confirm the details.");
      setShowAlert(true);
    } catch (error) {
      setAlertMessage("Error! Something went wrong. Please try again.");
      setShowAlert(true);
      console.error("FAILED...", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={sendEmail}>
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="persons">How Many Persons</Label>
            <Input
              id="persons"
              type="text"
              value={formData.persons}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Branch</Label>
            <Select onValueChange={handleBranchChange} value={formData.branch}>
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
                  {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <Button
        variant="orange"
        className="font-normal uppercase w-full mt-[30px] text-center flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <div className="loader"></div> // Add your loader component or CSS here
        ) : (
          "Submit"
        )}
      </Button>
      {showAlert && <p className="mt-4 text-white">{alertMessage}</p>}
    </form>
  );
};

export default ReservationForm;
