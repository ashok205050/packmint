"use client";

import { motion } from "framer-motion";
import { Children, ReactNode } from "react";

type StaggerGridProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerGrid({ children, className }: StaggerGridProps) {
  const childArray = Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: index * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
