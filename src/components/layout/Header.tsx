"use client";

import Link from "next/link";


export const Header = () => {
  return (
    <header className=" w-full bg-white border-b">
      <Link href="/" className="flex items-center"></Link>
    </header>
  )
}