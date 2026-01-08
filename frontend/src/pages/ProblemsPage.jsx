import React from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";

function ProblemsPage() {
  return (
    <>
      <button onClick={() => toast.success("This is a success toast")}>
        Click here to show the working of toast
      </button>
      <div className="min-h-screen bg-base-200">
        <Navbar />
      </div>
    </>
  );
}

export default ProblemsPage;
