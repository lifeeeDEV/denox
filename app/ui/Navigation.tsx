"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { cn } from "../utils/cn";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          // change rounded-full to rounded-lg
          // remove dark:border-white/[0.2] dark:bg-black bg-white border-transparent
          // change pr-2 pl-8 py-2 to px-10 py-5
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-xl border border-neutral-700 items-center justify-center space-x-4 bg-surface shadow-xl shadow-black/25",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          // backgroundColor: "rgba(17, 25, 40, 0.75)", // Replaced with bg-surface
          // borderRadius: "12px", // Removed, using rounded-xl from Tailwind
          // border: "1px solid rgba(255, 255, 255, 0.125)", // Replaced with border-neutral-700
        }}
      >
        {navItems.map((navItem: any, idx: number) => (
          <ScrollLink
            key={`link=${idx}`}
            to={navItem.link.replace("#", "")}
            smooth={true}
            duration={500}
            className={cn(
              "relative items-center flex space-x-1 text-foreground hover:text-accent !cursor-pointer"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            {/* add !cursor-pointer */}
            {/* remove hidden sm:block for the mobile responsive */}
            <span className=" text-sm">{navItem.name}</span>
          </ScrollLink>
        ))}
        <ScrollLink to="contact" smooth={true} duration={500}>
          <button className="border text-sm font-medium relative border-neutral-700 text-foreground px-4 py-2 rounded-full">
            <span>Contact</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
          </button>
        </ScrollLink>
      </motion.div>
    </AnimatePresence>
  );
};
