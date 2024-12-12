"use client";

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { useAppContext } from '../context'; // Import the language context
import contactTrans from '../translation/contactTrans'; // Import the translation file
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

  const [languege] = useAppContext(); // Get the selected language from the context

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

      setAlertMessage(contactTrans[languege].alertSuccess);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(contactTrans[languege].alertError);
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-orange">{contactTrans[languege].headerTitle}</h1>
        <p className="mt-3 text-lg text-white">{contactTrans[languege].headerDescription}</p>
      </motion.div>
      <form onSubmit={sendEmail} className="mx-auto mt-16 max-w-xl sm:mt-20 z-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-orange">{contactTrans[languege].firstName}</label>
            <div className="mt-2.5">
              <Input
                required
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={contactTrans[languege].firstName}
                className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-orange">{contactTrans[languege].lastName}</label>
            <div className="mt-2.5">
              <Input
                required
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={contactTrans[languege].lastName}
                className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-orange">{contactTrans[languege].subject}</label>
            <div className="mt-2.5">
              <Select onValueChange={handleSubjectChange} value={formData.subject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={contactTrans[languege].subject} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Franchise Inquiry">{contactTrans[languege].subjectOptions.franchiseInquiry}</SelectItem>
                  <SelectItem value="Report a Problem">{contactTrans[languege].subjectOptions.reportProblem}</SelectItem>
                  <SelectItem value="Other">{contactTrans[languege].subjectOptions.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-orange">{contactTrans[languege].email}</label>
            <div className="mt-2.5">
              <Input
                required
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={contactTrans[languege].email}
                className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-orange">{contactTrans[languege].phone}</label>
            <div className="mt-2.5">
              <Input
                required
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={contactTrans[languege].phone}
                className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-orange">{contactTrans[languege].message}</label>
            <div className="mt-2.5">
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={contactTrans[languege].message}
                rows="4"
                className="block w-full rounded-md border px-3.5 py-2 text-orange bg-black shadow-sm b-orange sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" disabled={loading} className="w-full rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2">
            {loading ? "Sending..." : contactTrans[languege].submitButton}
          </Button>
        </div>
      </form>
      {showAlert && (
        <div className='mt-6 p-4 text-white text-center' >
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default Contact;
