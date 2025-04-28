import { FileText } from 'lucide-react';
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:py-6 ">
      <div className="flex lg:flex-1">
        <Link href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          {" "}
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-950 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Summarize
          </span>
        </Link>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <Link href="#pricing">Pricing</Link>
        <Link href="/dashboard">Your Summaries</Link>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <div className="flex gap-2 items-center">
          <Link href="/upload">Upload a PDF</Link>
        </div>
        <Link href="/sign-in">Sign In</Link>
      </div>
    </nav>
  );
}

export default Header
