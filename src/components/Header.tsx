import Image from "next/image";
import NavLink from "./NavLink";
import Userinfo from "./Userinfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="container mx-auto px-3 sm:px-4">
      {/* Navbar */}
      <div className="flex items-start justify-between gap-2 bg-base-100 py-3">
        {/* Logo and Date */}
        <div className="flex items-center gap-2">
          <Image
            src="/logos.png"
            alt="logo"
            width={40}
            height={40}
            className="h-8 w-8 sm:h-10 sm:w-10"
          />

          <div>
            <h2 className="text-lg font-bold sm:text-2xl">বাজার দর</h2>
            <p className="mt-1 text-[10px] sm:text-sm">{date}</p>
          </div>
        </div>

        {/* Profile and Sign Out - Top Right */}
        <div className="ml-auto flex shrink-0 origin-top-right scale-90 items-start sm:scale-100">
          <Userinfo />
        </div>
      </div>

      <NavLink />
    </div>
  );
};

export default Header;
