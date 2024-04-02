"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();

  const { useLocalParticipant } = useCallStateHooks();
  const localeParticipant = useLocalParticipant();
  const isOwner =
    localeParticipant &&
    call?.state.createdBy &&
    localeParticipant.userId === call.state.createdBy.id;

  if (!isOwner) return;

  const handleEndCall = () => {
    call.endCall();
    return router.push("/");
  };
  return (
    <div>
      {isOwner && (
        <Button
          onClick={handleEndCall}
          className="bg-red-500 text-white rounded-2xl hover:bg-red-600"
        >
          End call for everyone
        </Button>
      )}
    </div>
  );
};

export default EndCallButton;
