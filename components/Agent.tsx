"use client";
import React from 'react'
import Image from "next/image";
import { cn } from "@/lib/utils";
import { brotliDecompress } from 'zlib';

enum CallStatus{
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
    INACTIVE = "INACTIVE",
}

const Agent = ({userName}: AgentProps) => {
    const callStatus = CallStatus.FINISHED; // This should be replaced with actual logic to determine call status
    const isSpeaking = true; // This should be replaced with actual logic to determine if the agent is speaking
    const messages =[
        'Whats your name?',
        'My name is MockMate, I am an AI Interviewer',
    ]
    const lastMessage = messages[messages.length - 1];
    return (
   <>
    <div className='call-view'>
        <div className='card-interviewer'>
        <div className='avatar'>
        <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}

        </div>
            <h3>AI Interviewer</h3>
            <p>AI Assistant</p>
     </div>
            <div className="card-border">
                <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>

        </div>

    </div>
    {messages.length > 0 && (
      <div className="transcript-border">
        <div className="transcript">
            <p key ={lastMessage}  className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}>
                {lastMessage}
            </p>
        </div>
      </div>
    
    
    )
        }

    <div className="w-full flex justify-center">
        {callStatus !== 'ACTIVE' ? (
            <button className="relative btn-call">
                 <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
            </button>
        ) : (
            <button className="btn-disconnect">
                <span>End Call</span>
            </button>
        )}
    </div>
   </>
  )
}

export default Agent