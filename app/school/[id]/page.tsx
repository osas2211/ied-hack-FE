import { Header } from "@/components/Header"
import Image from "next/image"
import React from "react"
import { Breadcrumb } from "antd"
import { BiHomeAlt } from "react-icons/bi"
import { BiSolidSchool } from "react-icons/bi"
import { SchoolDetails } from "./SchoolDetails"
import { Donate } from "./Donate"
import { Students } from "./Students"
import { Footer } from "@/components/Footer"

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

function SchoolPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const items = [
    {
      href: "/",
      title: (
        <div className="inline-flex items-center gap-2">
          <BiHomeAlt className="inline" />
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <BiSolidSchool />
          <span>School</span>
        </div>
      ),
    },
    {
      title: <span>{id}</span>,
    },
  ]
  return (
    <>
      <div className="bg-[#cfcfcf67] md:m-2 md:p-[2rem] p-[1rem] md:rounded-md urbanist min-h-[98vh] relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none h-[40rem] z-[-1]">
          <Image fill alt="beams" src={"/beams-basic.png"} />
        </div>
        <Header />
        <Breadcrumb items={items} className="my-[2rem]" />
        <div className="flex justify-between gap-4 md:flex-row flex-col items-start">
          <SchoolDetails />
          <Donate />
        </div>
        <Students />
      </div>
      <Footer />
    </>
  )
}

export default SchoolPage
