'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  return (
    <div className="px-6 pb-12 pt-24 sm:pb-24 sm:pt-40 lg:px-8 mt-10">
  <motion.div
      variants={fadeIn('down' , 0.8)}
      initial='hidden'
      whileInView={'show'}
      viewport={{once:false, amount:0.4}} 
  className="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-orange">Let's Talk</h1>
    <p className="mt-3 text-lg text-white">Got a feature request, suggestion, or feedback? We’d love to hear from you! We also offer franchise opportunities for those interested in bringing our concept to new locations. Fill out the form below, and we'll get back to you soon!</p>
  </motion.div>
  <form className="mx-auto mt-16 max-w-xl sm:mt-20 z-10">
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-orange">First name</label>
        <div className="mt-2.5">
          <Input required="" type="text" name="first-name" id="first-name" autoComplete="given-name" placeholder="Your First Name" className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-orange">Last name</label>
        <div className="mt-2.5">
          <Input required="" type="text" name="last-name" id="last-name" autoComplete="family-name" placeholder="Your Last Name" className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-orange">Subject</label>
        <div className="mt-2.5">
        <Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Subject" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="ABu-Dhabi-Al-Qana">Franchise inquiry</SelectItem>
    <SelectItem value="Dubai-JBR">Report a problem</SelectItem>
    <SelectItem value="Dubai-Hills">Other</SelectItem>
  </SelectContent>
</Select>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-orange">Email</label>
        <div className="mt-2.5">
          <Input required="" type="email" name="email" id="email" autoComplete="email" placeholder="Your Email Address" className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-orange">Phone number</label>
        <div className="mt-2.5">
          <Input required="" type="tel" name="phone" id="phone" autoComplete="tel" placeholder="Your Phone Number" className="block w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-orange">Message</label>
        <div className="mt-2.5">
          <textarea name="message" id="message" rows="4" placeholder="Share your thoughts..." className="block bg-black w-full rounded-md border px-3.5 py-2 text-orange shadow-sm b-orange sm:text-sm sm:leading-6"></textarea>
        </div>
      </div>
    </div>
    <div className="mt-10">
      <Button variant='orange' type="submit" className="text-white py-2 w-full block">Submit →</Button>
    </div>
  </form>
</div>

  )
}

export default page