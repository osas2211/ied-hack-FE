"use client"
import React, { useState } from "react"
import Image from "next/image"

interface props {
  image: string
  schoolName: string
  id: string
}

export const SchoolCard: React.FC<props> = ({ ...props }) => {
  return (
    <div className="p-[0.7rem] h-[450px] w-full rounded-[14px] border-[1px] border-grey-200 bg-white flex-initial no-scrollbar text-white">
      <div className="relative w-full h-full">
        <div className="bg-[#0A0A0A33] backdrop-blur-[20px] p-[10px] rounded-[20px] absolute top-[18px] right-[18px] z-10">
          20k donations
        </div>
        <Image
          src={props.image}
          fill
          alt={props.schoolName}
          className="rounded-[10px]"
          objectFit="cover"
        />
      </div>
      <div className="relative">
        <div className="backdrop-blur-[20px] p-[16px] md:p-[16px] mt-[-2rem] rounded-b-[14px] bg-[#0A0A0A33] card-shadow absolute bottom-0 left-0 min-h-[124px] z-1 w-full">
          <div className="flex flex-col justify-between gap-[1.5rem] ">
            <p className="uppercase alegreya">{props.schoolName}</p>
            <button className="bg-green px-7 py-3 hover:text-grey-700 card-btn relative overflow-hidden">
              <span className="relative z-[10]">View School</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
