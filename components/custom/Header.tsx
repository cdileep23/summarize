
"use client"
import { FileText } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  const isLoggedIn = false;
  const pathname = usePathname();

  // Helper function to determine if a link is active
  const isActive = (href: string) => {
    return (pathname === href||(href!=='/' && pathname.startsWith(href)));
  };

  return (
    <nav className="container flex items-center justify-between py-4 lg:py-6 ">
      <div className="flex lg:flex-1">
        <Link
          href="/"
          className={`flex items-center gap-1 lg:gap-2 shrink-0 transition-colors text-sm duration-200 ${
            isActive("/")
              ? "text-rose-500"
              : "text-gray-600 hover:text-rose-500"
          }`}
        >
          {" "}
          <FileText
            className={`w-5 h-5 lg:w-8 lg:h-8 hover:rotate-12 transform transition duration-200 ease-in-out ${
              isActive("/") ? "text-rose-500" : "text-gray-950"
            }`}
          />
          <span
            className={`font-extrabold lg:text-xl ${
              isActive("/") ? "text-rose-500" : "text-gray-900"
            }`}
          >
            Summarize
          </span>
        </Link>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center ">
        <Link
          href="/#pricing"
          className={`transition-colors text-sm duration-200 ${
            isActive("#pricing")
              ? "text-rose-500"
              : "text-gray-600 hover:text-rose-500"
          }`}
        >
          Pricing
        </Link>
        <SignedIn>
 <Link
            href="/dashboard"
            className={`transition-colors text-sm duration-200 ${
              isActive("/dashboard")
                ? "text-rose-500"
                : "text-gray-600 hover:text-rose-500"
            }`}
          >
            Your Summaries
          </Link>
        </SignedIn>
       
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
  <div className="flex gap-2 items-center">
            <Link
              href="/upload"
              className={`transition-colors text-sm duration-200 ${
                isActive("/upload")
                  ? "text-rose-500"
                  : "text-gray-600 hover:text-rose-500"
              }`}
            >
              Upload a PDF
            </Link>
            <UserButton/>
          </div>
        </SignedIn>
        <SignedOut>
<Link
            href="/sign-in"
            className={`transition-colors text-sm duration-200 ${
              isActive("/sign-in")
                ? "text-rose-500"
                : "text-gray-600 hover:text-rose-500"
            }`}
          >
            Sign In
          </Link>
        </SignedOut>
       
      </div>
    </nav>
  );
};

export default Header;
