"use client";

import { sideBarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <section className="sticky left-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col gap-8">
        {sideBarLinks.map((link) => {
          return (
            <Link
              className={`text-white text-lg md:text-xl px-3 py-2 rounded-lg hover:bg-blue-500 transition-all duration-150 flex items-center gap-3 ${
                pathname === link.route ? "bg-blue-500" : "bg-none"
              }`}
              key={link.route}
              href={link.route}
            >
              <Image
                src={link.imageUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
