
import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Avatar, Button } from "@heroui/react";
import { AlignJustify, ChevronLeft, ChevronRight, Coffee, LogOut, MoreHorizontal, X } from "lucide-react";
import thumbnail from "@/assets/images/thumbnail.png";
import { useState } from "react";
import Markdown from 'react-markdown'
import { Link } from "react-router-dom";

export default function SecondLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className="relative font-poppins">
      {/* header */}
      <header className="p-3 flex items-center justify-between sticky top-0 bg-white z-10">
        {/* button out */}
        <div className="flex items-center gap-2">
          <Link className="px-5 py-3 rounded bg-slate-50" to="/study-plan">
            <ChevronLeft size={16} />
          </Link>
          <span className="text-2xl font-semibold">
            PREP
          </span>
          |
          <span className="text-2xl font-semibold">
            Lộ trình học N4
          </span>
        </div>
        {/* button more */}
        <Avatar />
      </header>
      <main className="container mx-auto px-3 flex">
       {children}
      </main>
    </div>
  );
}