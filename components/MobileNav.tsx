"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger"
            width={36}
            height={36}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="border-none bg-dark-1">
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              className="max-sm:size-10"
              alt="logo"
            />
            <p className="text-[26px] font-extrabold text-white">Yoom</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-autof">
            <section className="flex h-full flex-col gap-6 pt-16 text-white">
              {sideBarLinks.map((link) => {
                return (
                  <SheetClose asChild key={link.route}>
                    <Link
                      className={cn(
                        `text-white text-lg md:text-xl px-3 py-2 rounded-lg hover:bg-blue-500 transition-all duration-150 flex items-center gap-3 ${
                          pathname === link.route ? "bg-blue-500" : "bg-none"
                        }`
                      )}
                      key={link.route}
                      href={link.route}
                    >
                      <Image
                        src={link.imageUrl}
                        alt={link.label}
                        width={24}
                        height={24}
                      />
                      <p className="text-lg font-semibold">{link.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
          <div className="flex h-full flex-col gap-6 pt-16 text-white"></div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
