import Image from "next/image";
import NavLink from "./NavLink";
import Userinfo from "./Userinfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="container mx-auto">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-base-100">
        <div className="flex items-center gap-2 mt-3">
          <Image src="/logos.png" alt="logo" width={40} height={40} />

          <div>
            <h2 className="text-2xl font-bold">বাজার দর</h2>
            <p className="mt-1">{date}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <Userinfo />
        </div>
      </div>

      <NavLink />
    </div>
  );
};

export default Header;
