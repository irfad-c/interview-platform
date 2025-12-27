import React from "react";
import toast from "react-hot-toast";

function ProblemsPage() {
  return (
    <>
      <button onClick={() => toast.success("This is a success toast")}>
        Click here to show the working of toast
      </button>
    </>
  );
}

export default ProblemsPage;
