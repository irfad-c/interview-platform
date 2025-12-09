import "./App.css";
import { SignInButton } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <h1>Welcome to the App</h1>
      <SignInButton mode="model" />
    </>
  );
}

export default App;
