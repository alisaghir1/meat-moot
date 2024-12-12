"use client";

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle subject selection
  const handleSubjectChange = (value) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  // Send email using EmailJS
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_9dw8n2b", // Replace with your EmailJS service ID
        "template_z8t1sxm", // Replace with your EmailJS template ID
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          subject: formData.subject,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        "bz-racFIdw40qpvrn" // Replace with your EmailJS user ID
      );

      setFormData({
        firstName: '',
        lastName: '',
        subject: '',
        email: '',
        phone: '',
        message: '',
      });

      setAlertMessage("Thank you for your message! We have received your request and will get back to you shortly.");
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
    <div className="px-6 pb-12 pt-24 sm:pb-24 sm:pt-40 lg:px-8 mt-10">
      <motion.div
        variants={fadeIn('down', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.4 }}
        className="mx-auto max-w-xl flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-orange">Let&rsquo;s Talk</h1>
        <p className="mt-3 text-lg text-white">Got a feature request, suggestion, or feedback? We&rsquo;d love to hear from you! We also offer franchise opportunities for those interested in bringing our concept to new locations. Fill out the form below, and we&rsquo;ll get back to you soon!</p>
      </motion.div>
      <form onSubmit={sendEmail} className="mx-auto mt-16 max-w-xl sm:mt-20 z-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-orange">First name</label>
            <div className="mt-2.5">
              <Input
                required
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your First Name"
                className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-orange">Last name</label>
            <div className="mt-2.5">
              <Input
                required
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your Last Name"
                className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-orange">Subject</label>
            <div className="mt-2.5">
              <Select onValueChange={handleSubjectChange} value={formData.subject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Franchise Inquiry">Franchise Inquiry</SelectItem>
                  <SelectItem value="Report a Problem">Report a Problem</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-orange">Email</label>
            <div className="mt-2.5">
              <Input
                required
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email Address"
                className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-orange">Phone number</label>
            <div className="mt-2.5">
              <Input
                required
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-orange">Message</label>
            <div className="mt-2.5">
              <textarea
                required
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Share your thoughts..."
                className="block bg-black w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button
            variant="orange"
            type="submit"
            className="text-white py-2 w-full flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="loader text-center"></div> // Add your loader component or CSS here
            ) : (
              "Submit →"
            )}
          </Button>
        </div>
      </form>
      {showAlert && <p className="mt-4 text-white text-center">{alertMessage}</p>}
    </div>
  );
};

export default Contact;
