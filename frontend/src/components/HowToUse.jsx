import React from "react";

const HowToUse = ({flexDirection, title, description, vid}) => {
    const titleJustified = flexDirection==='flex-row-reverse' ? "justify-start" : 'justify-end';
    const divideDirection = flexDirection==='flex-row-reverse'? 'divide-x-reverse' : '';
  return (
    <div className={`flex  ${flexDirection} gap-3 flex-row  text-textGreen m-10 my-18 divide-x-2 ${divideDirection}  divide-textGreen`}>
      <div className="flex-1 max-sm:">

      <video autoPlay muted  className="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700">
        <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4"/>
             browser does not support the video tag.
            </video>
      </div>

      <div className="h-full w-0 bg-YellowText "></div>
      <div className="flex-1 flex justify-center  flex-col p-5">
        {/* <p className={flexDirection==='flex-row-reverse' ? "flex justify-start text-lg font-semibold text-YellowText" : 'flex justify-end'}>{title}</p> */}
        <p className={`flex ${titleJustified} text-2xl font-semibold text-YellowText`}>{title}</p>
        <p className=" text-justify">{description}</p>
      </div>
    </div>
  );
};

export default HowToUse;
