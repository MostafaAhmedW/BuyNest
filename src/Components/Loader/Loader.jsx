import React from "react";
import { Triangle } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <Triangle width={200} />
      </div>
    </>
  );
}
