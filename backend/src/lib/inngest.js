import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

//This file listen for an event from clerk
export const inngest = new Inngest({ id: "talent-iq" });
//sync a new user into mongoDB database
const syncUser = inngest.createFunction(
  { id: "sync user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("Inngest sync user started");
    await connectDB();
    console.log("DB connected");
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };
    await User.findOneAndUpdate(
      {
        clerkId: id,
      },
      newUser,
      { upsert: true, new: true }
    );
    console.log("New user created in DB");

    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });
    console.log("Stream upsert user fininshed");
  }
);

//Delete user from mongoDB

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];

/*
Inngest is a background job system
It runs code when an event happens

event contains data sent by Clerk
This data comes from a webhook

Inngest needs [syncUser] array to register functions
Without this → function won’t run

Clerk sends an event (webhook) to Inngest
That event contains user data created in Clerk
That data looks like this (simplified):

event.data = {
  id: "user_2abcXYZ",
  email_addresses: [
    {
      email_address: "test@gmail.com"
    }
  ],
  first_name: "Irfad",
  last_name: "C",
  image_url: "https://img.clerk.com/..."
}
*/
