"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { homeCardsList } from "@/constants";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const { toast } = useToast();

  const router = useRouter();
  const [meetingState, setMeetingState] = useState("");
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetail, setCallDetail] = useState<Call>();
  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please Select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
        toast({ title: "Meeting room created successfully" });
      }
    } catch (error) {
      toast({ title: "Failded to create meeting room" });
      throw new Error("Error while create meeting");
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {homeCardsList.map((card, i) => (
        <HomeCard
          key={i}
          src={card.src}
          color={card.color}
          text1={card.text1}
          text2={card.text2}
          handleClick={() =>
            card.action === "recording"
              ? router.push("/recordings")
              : setMeetingState(card.action)
          }
        />
      ))}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState("")}
          title={"Create Meeting"}
          handleClick={createMeeting}
        >
          <div className="w-full flex flex-col gap-2.5 text-dark-1">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:-ring-offset-0"
            />
          </div>
          <div className="flex w-full flex-col gap-2.5 text-dark-1">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Select Date & Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState("")}
          title={"Meeting Created"}
          className={"text-center"}
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState("")}
        title={"Start an Instant Meeting"}
        className={"text-center"}
        buttonText="Start Meeting"
        handleClick={createMeeting}
        image=""
        buttonIcon=""
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState("")}
        title={"Type the link here"}
        className={"text-center"}
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
        image=""
        buttonIcon=""
      >
        <Input
          placeholder="Meeting link"
          className="border-none bg-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
