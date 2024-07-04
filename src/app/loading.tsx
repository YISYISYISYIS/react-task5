"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#36D7B7" size={50} />
      <h2>잠시만 기다려 주세요</h2>
    </div>
  );
}

// export default function loading() {
//   return <div>Loading...</div>;
// }
