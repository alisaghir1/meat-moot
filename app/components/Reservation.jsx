"use client";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import ReservationForm from "./ReservationForm";

const Reservation = () => {
  

  
  return (
    <section
    
      className="xl:py-32 xl:h-[1020px] bg-reservation xl:bg-no-repeat xl:flex xl:flex-col xl:justify-end xl:items-end"
      id="reservation"
    >
      <motion.div
        variants={fadeIn("left", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="bg-black bg-opacity-20 border border-black w-full xl:max-w-[868px] min-h-[518px] p-8 xl:p-16 shadow-lg backdrop-blur-md">
        <h2 className="text-orange mb-9 capitalize">Book a table</h2>
        <ReservationForm />
      </motion.div>
    </section>
  );
};

export default Reservation;
