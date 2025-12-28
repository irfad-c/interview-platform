import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import toast from "react-hot-toast";

function HomePage() {
  return (
    <>
      <button onClick={() => toast.success("This is a success toast")}>
        Click here to show the working of toast
      </button>
      <h1 className="bg-amber-200">Welcome to the App</h1>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign in</button>
        </SignInButton>
      </SignedOut>
      <UserButton />
    </>
  );
}

export default HomePage