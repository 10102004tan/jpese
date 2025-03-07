import { Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import {Avatar} from "@heroui/react";

export const Header = () => {

  return (
    // set container for navbar
    <header className="container mx-auto px-6 h-16 py-3 border-b border-gray-700 z-50 sticky top-0">
      {/*  */}
        {/* logo */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlignJustify className="text-white" size={24}/>
            <Link to={"/"} className="flex text-white items-center gap-2 font-bold text-xl">
              PREP
            </Link>
          </div>

          {/* avatar */}
          <Avatar/>
        </div>
    </header>
  );
};
