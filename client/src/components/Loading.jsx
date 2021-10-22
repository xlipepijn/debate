import React from "react";
import Lottie from "react-lottie";
import animationData from "../images/lf30_editor_4umcxcsy.json";

const Loading = () => {

       const defaultOptions = {
         loop: true,
         autoplay: true,
         animationData: animationData,
         rendererSettings: {
           preserveAspectRatio: "xMidYMid slice",
         },
       };
  return (
    <div>
      <div className="loading-container">
        {/* <Lottie animationData={animationData} /> */}
        <div className='loading-copy'>
          <Lottie
            options={defaultOptions}
            height={32}
            width={32}
            isStopped={false}
            isPaused={false}
          />
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
