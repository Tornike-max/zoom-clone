"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { homeCardsList } from "@/constants";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";

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
              ? router.push("/recording")
              : setMeetingState(card.action)
          }
        />
      ))}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState("")}
        title={"Start an Instant Meeting"}
        className={"text-center"}
        buttonText="Start Meeting"
        handleClick={createMeeting}
        image=""
        buttonIcon=""
      >
        hello
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
