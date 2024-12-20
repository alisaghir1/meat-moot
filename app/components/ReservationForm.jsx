"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import emailjs from "emailjs-com";

import { cn } from "@/lib/utils";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import reservationFormTrans from "../translation/reservationFormTrans.js"; // Adjust path
import { useAppContext } from "../context";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    persons: "",
    branch: "",
    time: "",
    email: "",
    phone: "",
    date: null, // Date object
  });

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [languege] = useAppContext(); // Get the current languege from context

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBranchChange = (value) => {
    setFormData((prev) => ({ ...prev, branch: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

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
          time: formData.time,
          email: formData.email,
          phone: formData.phone,
          date: formData.date ? format(formData.date, "PPP") : "Not Selected",
        },
        "bz-racFIdw40qpvrn"
      );

      setFormData({
        firstName: "",
        lastName: "",
        persons: "",
        branch: "",
        time: "",
        email: "",
        phone: "",
        date: null,
      });
      setAlertMessage(reservationFormTrans[languege].alertSuccess);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(reservationFormTrans[languege].alertError);
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
            <Label htmlFor="firstName">
              {reservationFormTrans[languege].firstName}
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="lastName">
              {reservationFormTrans[languege].lastName}
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">
              {reservationFormTrans[languege].email}
            </Label>
            <Input
              id="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">
              {reservationFormTrans[languege].phone}
            </Label>
            <Input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="persons">
              {reservationFormTrans[languege].persons}
            </Label>
            <Input
              id="persons"
              type="text"
              value={formData.persons}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>{reservationFormTrans[languege].branch}</Label>
            <Select onValueChange={handleBranchChange} value={formData.branch}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={reservationFormTrans[languege].branch}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ABu-Dhabi-Al-Qana">
                  {reservationFormTrans[languege].branches["ABu-Dhabi-Al-Qana"]}
                </SelectItem>
                <SelectItem value="Dubai-JBR">
                  {reservationFormTrans[languege].branches["Dubai-JBR"]}
                </SelectItem>
                <SelectItem value="Dubai-Hills">
                  {reservationFormTrans[languege].branches["Dubai-Hills"]}
                </SelectItem>
                <SelectItem value="Dubai-City-Walk">
                  {reservationFormTrans[languege].branches["Dubai-City-Walk"]}
                </SelectItem>
                <SelectItem value="Dubai-Al-Khawaneej">
                  {
                    reservationFormTrans[languege].branches[
                      "Dubai-Al-Khawaneej"
                    ]
                  }
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid mt-[30px] grid-cols-1 xl:grid-cols-1 gap-[30px]">
        <div>
            <Label htmlFor="time">
              {reservationFormTrans[languege].time}
            </Label>
            <Input
              id="time"
              type="text"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label>{reservationFormTrans[languege].date}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"input"}
                  className={cn("w-full justify-start text-left font-normal")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? (
                    format(formData.date, "PPP")
                  ) : (
                    <span>{reservationFormTrans[languege].date}</span>
                  )}
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
          reservationFormTrans[languege].submit
        )}
      </Button>
      {showAlert && <p className="mt-4 text-white">{alertMessage}</p>}
    </form>
  );
};

export default ReservationForm;
