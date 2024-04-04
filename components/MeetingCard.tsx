import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { avatarImages } from "@/constants";
import { formatDate } from "@/helperFunctions/formatDate";

const MeetingCard = ({
  type,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  buttonText,
  handleClick,
  link,
}: {
  type: "ended" | "upcoming" | "recordings";
  title: string;
  date: string | undefined;
  isPreviousMeeting: boolean;
  buttonIcon1: string | undefined;
  buttonText: "Play" | "Start";
  handleClick: () => void;
  link: string;
}) => {
  return (
    <section className="w-full rounded-2xl bg-dark-1 text-sky-1 p-6 ">
      <div className="w-full flex items-center justify-start">
        <Image
          src={
            type === "upcoming"
              ? "/icons/upcoming.svg"
              : type === "recordings"
              ? "/icons/recordings.svg"
              : "icons/previous.svg"
          }
          alt={`icon-${type}`}
          width={30}
          height={30}
          className="pb-4"
        />
      </div>
      <h1 className="text-lg sm:text-xl md:text-2xl py-2">{title}</h1>
      <p className="text-base sm:text-lg md:text-xl">
        {formatDate(date || "")}{" "}
      </p>
      <div className="w-full flex items-center justify-between gap-4">
        <div className="w-full flex items-center justify-start py-4">
          {avatarImages &&
            avatarImages.map((img: string, index: number) => (
              <Image
                src={img}
                key={img}
                alt="attendees"
                width={40}
                height={40}
                className={`rounded-full`}
                style={{ top: 0, left: index * 28 }}
              />
            ))}
        </div>
        {!isPreviousMeeting && (
          <div className="w-full flex items-center justify-center gap-2">
            <Button
              onClick={handleClick}
              className="bg-blue-500 text-white hover:bg-blue-600 duration-200 transition-all"
            >
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({ title: "Link Copied" });
              }}
              className="flex items-center gap-1 justify-between bg-gray-800 hover:bg-gray-700 duration-200 transition-all"
            >
              <Image
                src={buttonIcon1 || ""}
                alt="copy icon"
                width={20}
                height={20}
              />
              <span>Copy Invitation</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MeetingCard;
