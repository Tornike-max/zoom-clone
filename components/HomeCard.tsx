import Image from "next/image";
import React from "react";

const HomeCard = ({
  src,
  color,
  text1,
  text2,
  handleClick,
}: {
  src: string;
  color: string;
  text1: string;
  text2: string;
  handleClick: () => void;
}) => {
  return (
    <div
      onClick={() => handleClick()}
      className={`${
        color === "bg-yellow-1"
          ? "bg-yellow-1 hover:bg-yellow-400"
          : color === "bg-purple-1"
          ? "bg-purple-1 hover:bg-purple-500"
          : color === "bg-blue-600"
          ? "bg-blue-600 hover:bg-blue-500"
          : color === "bg-orange-1"
          ? "bg-orange-1 hover:bg-orange-400"
          : ""
      } duration-150 transition-all px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={src} alt="home-icons" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{text1}</h1>
        <p className="text-lg font-normal">{text2}</p>
      </div>
    </div>
  );
};

export default HomeCard;
