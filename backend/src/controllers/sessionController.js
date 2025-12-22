import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "Both problem and difficulty required" });
    }

    //Generate a unique call Id for stream video
    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;
    //session creation inside mongoDB
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });
    //create stream video call
    await streamClient.video
      .call("default", callId)
      /* If the call already exists → fetch it
      If it doesn’t exist → create it */
      .getOrCreate({
        data: {
          created_by_id: clerkId,
          custom: { problem, difficulty, sessionId: session._id.toString() },
        },
      });
    //create stream chat channel
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem}Session`,
      created_by_id: clerkId,
      //Initial participants in the chat.
      members: [clerkId],
    });
    await channel.create();
    res.status(201).json({ session });
  } catch (error) {
    console.error("Error in creating session", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getActiveSession(req, res) {
  try {
    const session = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ session });
  } catch (error) {
    console.error("Error to get active session details", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

/*
Date.now() return current time in milliseconds

36 = number base (radix)
Base 36 means:
digits 0–9
letters a–z
So base-36 uses 36 characters total.

.substring(7) = “cut off the first 7 characters”
Starts at index 7, keeps everything from there to the end

Math.random()
0.842731924
.toString(36)
"0.q3m9s8"
.substring(7)
"s8"

*/
