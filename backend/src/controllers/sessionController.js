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
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error to get active session details", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMyRecentSession(req, res) {
  try {
    const userId = req.user._id;
    const sessions = await Session.find({
      status: "completed",
      //Include sessions where ANY ONE of these is true.
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error to get recent session details", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSessionById() {
  try {
    const { id } = req.params;
    const sessions = await Session.findById(id)
      .populate("host", "name profileImage clerkId email")
      .populate("participant", "name profileImage clerkId email");

    if (!sessions)
      return res.status(404).json({ message: "Session not found" });

    res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error to get session details", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const sessions = await Session.findById(id);
    if (!sessions)
      return res.statsus(404).json({ message: "Session not found" });
    if (sessions.participant)
      return res.status(404).json({ message: "Session is full" });
    sessions.participant = userId;
    await sessions.save();
    const channel = chatClient.channel("messaging", sessions.callId);
    /*addMembers gives users permission to participate in a Stream chat channel by adding them as members.
    addMembers is a method on the channel object returned by the Stream SDK. */
    await channel.addMembers([clerkId]);
    res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error to get session details", error.message);
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
