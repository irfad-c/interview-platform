import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

function HomePage() {
  return (
    <>
      <h1>Welcome to the App</h1>
      <SignedIn>
        <SignOutButton />
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign in</button>
        </SignInButton>
      </SignedOut>
    </>
  );
}

export default HomePage;
