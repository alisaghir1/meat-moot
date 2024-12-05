"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import { Button } from "./ui/button";

const Header = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    //detect scroll
    const handleScroll = () => {
      setActive(window.scrollY > 100);
    };

    //event listener
    window.addEventListener("scroll", handleScroll);

    //remove listener on return
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(active);

  return (
    <header
      className={`${
        active ? "bg-black-heavy py-4" : "bg-none py-8"
      } fixed top-0 w-full z-50 left-0 right-0 transition-all duration-200`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image priority  alt="logo" width={120} height={35} src={"/logo.png"} />
          </Link>
          <Nav containerStyles={'hidden xl:flex gap-x-12 text-white'} linkStyles={'capitalize'} />
          <ScrollLink to="reservation" smooth={true}>
            <Button variant="orange" size="sm">
              Book now
            </Button>
          </ScrollLink>
          <NavMobile containerStyles={'xl:hidden'} iconStyles={'text-3xl'} linkStyles={'uppercase'} />
        </div>
      </div>
    </header>
  );
};

export default Header;
