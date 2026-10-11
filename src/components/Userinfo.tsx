"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const Userinfo = () => {
  const { data: section } = authClient.useSession();
  const user = section?.user;
  console.log(user);

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        <div className="flex justify-centerm mt-5 gap-5">
          <div className="gap-2 ">
            <Link href={"/profile"}>
              <div className="avatar ">
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                  <Image
                    alt="Tailwind-CSS-Avatar-component"
                    // src={user?.image as string}
                    src={
                      user?.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbP0ifhQjaZBJOYxSKE0q4uEtD5IV1gA_6IHtbExr6gA&s"
                    }
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            </Link>

            {/* <div className="flex justify-center gap-2"> */}
            <h2 className="  mt-2 items-center justify-center ">
              {user?.name}
            </h2>
          </div>
          <button
            onClick={handleSignout}
            className="text-[10px] btn btn-active bg-[#05893E] text-white rounded-lg"
          >
            Singout
          </button>
          {/* </div> */}
          {/* <p>{user?.email}</p> */}
          {/* <p>{user?.password}</p> */}
        </div>
      ) : (
        <div className="flex gap-3">
          <Link href={"/signin"}>
            <button className="btn btn-ghost">সাইন ইন</button>
          </Link>

          <Link href={"/signup"}>
            <button className="btn btn-active bg-[#05893E] text-white rounded-lg">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Userinfo;
