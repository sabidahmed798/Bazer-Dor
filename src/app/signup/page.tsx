"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };
    // console.log(data);

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("সফলভাবে সাইন আপ হয়েছে");
      redirect("/");
    }
    if (error) {
      toast.error("সাইন আপ করা যায়নি");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="text-center text-base-content/70 mb-6">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <form onSubmit={onSubmit} className="flex justify-center">
          <fieldset className="fieldset bg-base-200 border border-base-300 rounded-2xl w-full p-6 shadow-lg">
            <label className="label">নাম</label>
            <input
              name="name"
              type="text"
              className="input w-full"
              placeholder="যেমন: রহিম উদ্দিন"
              required
            />

            <label className="label mt-2">ইমেইল</label>
            <input
              name="email"
              type="email"
              className="input w-full"
              placeholder="you@example.com"
              required
            />

            <label className="label mt-2">পাসওয়ার্ড</label>
            <input
              name="password"
              type="password"
              className="input w-full"
              placeholder="কমপক্ষে ৮ অক্ষর"
              minLength={6}
              required
            />

            <label className="label mt-2">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              name="passwordsure"
              type="password"
              className="input w-full"
              placeholder="আবার লিখুন"
              minLength={8}
              required
            />

            <button
              type="submit"
              className="btn w-full bg-[#05893E] text-white border-none hover:bg-[#047532] mt-5"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </fieldset>
        </form>

        <div className="mt-4 flex w-full max-w-md justify-center gap-2">
          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-2 text-[10px] font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 sm:text-xs"
          >
            <Image
              className="h-4 w-4 shrink-0 object-contain"
              src="/google.png"
              alt="Google Logo"
              width={100}
              height={100}
            />

            <span className="whitespace-nowrap">Google দিয়ে চালিয়ে যান</span>
          </button>

          {/* GitHub Sign In */}
          <button
            type="button"
            onClick={handleGithubSignIn}
            className="flex h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-2 text-[10px] font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 sm:text-xs"
          >
            <Image
              className="h-4 w-4 shrink-0 object-contain"
              src="/github.png"
              alt="GitHub Logo"
              width={50}
              height={50}
            />

            <span className="whitespace-nowrap">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-600 items-center flex justify-center">
          অ্যাকাউন্ট নেই?{" "}
          <span className="cursor-pointer font-medium text-[#05893e]">
            সাইন ইন করুন
          </span>
        </p>

        <p className="mt-5 text-xs text-gray-500 flex justify-center">
          <a href={"/"} className="transition hover:text-[#05893e]">
            ← হোম পেজে ফিরে যান
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
