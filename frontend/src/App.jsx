import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
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
}

export default App;
