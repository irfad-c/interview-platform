import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

//stream video setup
export const streamClient=new StreamClient(apiKey,apiSecret)
//stream chat setup
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Upserted stream user successfully");
  } catch (error) {
    console.error("Cant upsert user from stream", error.message);
    console.error("Details", error);
    throw error;
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Deleted stream user successfully");
  } catch (error) {
    console.error("Cant delete user from stream");
  }
};
/*
getInstance creates (or returns) a single Stream Chat client that your backend will use to talk to Stream’s servers.
*/
