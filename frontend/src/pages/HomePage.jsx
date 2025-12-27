import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <>
      <h1>Welcome to the App</h1>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="model">
          <button>Sign in</button>
        </SignInButton>
      </SignedOut>
      <UserButton />
    </>
  );
};

export default HomePage;
